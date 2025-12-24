import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, grade, playerName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const isMath = subject === "math";
    
    // PHÚC KHANG: Toán chỉ trong phạm vi 100, chưa học số lớn hơn
    const mathGrade3Topics = [
      "Bảng nhân 2, 3, 4, 5 (VD: 3 x 7 = ?, 4 x 8 = ?, 5 x 9 = ?)",
      "Bảng nhân 6, 7, 8, 9, 10 (VD: 6 x 5 = ?, 7 x 8 = ?, 9 x 6 = ?)",
      "Bảng chia tương ứng với bảng nhân (VD: 36 : 6 = ?, 45 : 9 = ?, 56 : 7 = ?)",
      "Phép cộng trong phạm vi 100 (VD: 45 + 38 = ?, 67 + 29 = ?)",
      "Phép trừ trong phạm vi 100 (VD: 83 - 47 = ?, 92 - 56 = ?)",
      "Tìm X trong phép cộng trừ (VD: X + 25 = 67, 84 - X = 39)",
      "Tìm X trong phép nhân chia (VD: X x 5 = 35, X : 4 = 8)",
      "Tính giá trị biểu thức 2 phép tính (VD: 25 + 15 - 18 = ?, 6 x 7 + 8 = ?)",
      "So sánh số trong phạm vi 100 (VD: 47 ... 74, điền dấu >, <, =)",
      "Đếm thêm, đếm bớt (VD: 23, 26, 29, ?, ? - Tìm 2 số tiếp theo)",
      "Bài toán có lời văn: hơn kém (VD: Lan có 45 viên bi, Hoa ít hơn 12 viên. Hỏi Hoa có mấy viên?)",
      "Bài toán có lời văn: gấp lần (VD: Số A là 8, số B gấp 6 lần số A. Tính số B?)",
      "Đọc giờ đúng và giờ rưỡi (VD: Kim ngắn chỉ 3, kim dài chỉ 6. Hỏi mấy giờ?)",
      "Đổi đơn vị đo độ dài đơn giản (VD: 1m = ? cm, 50cm = ? dm)"
    ];
    
    // PHÚC KHANG: Tiếng Anh lớp 3 - tăng 30% độ khó và đa dạng
    const englishGrade2Topics = [
      "Từ vựng về động vật: dog, cat, bird, fish, elephant, lion, monkey (hỏi nghĩa hoặc dịch)",
      "Từ vựng về màu sắc: red, blue, green, yellow, orange, pink, purple (hỏi nghĩa hoặc dịch)",
      "Từ vựng về đồ vật trong nhà: table, chair, bed, door, window, book, pen (hỏi nghĩa hoặc dịch)",
      "Từ vựng về gia đình: mother, father, sister, brother, grandmother, grandfather",
      "Số đếm 1-20: one, two, three... twenty (hỏi số hoặc viết bằng chữ)",
      "Điền từ còn thiếu: I ___ a student. (am/is/are)",
      "Chọn đáp án đúng: This is ___ apple. (a/an)",
      "Hỏi về đồ vật: What is this? - It is a ___.",
      "Từ vựng về thức ăn: apple, banana, rice, bread, milk, water, egg"
    ];
    
    const englishGrade3Topics = [
      // === TỪ VỰNG CƠ BẢN ===
      "Từ vựng về nghề nghiệp: teacher, doctor, nurse, farmer, driver, police officer, firefighter, chef, pilot, dentist, engineer, artist",
      "Từ vựng về thời tiết: sunny, rainy, cloudy, windy, hot, cold, snowy, stormy, foggy, warm, cool",
      "Từ vựng về các môn học: Math, English, Science, Music, Art, P.E., History, Geography, Vietnamese",
      "Từ vựng về phương tiện: car, bus, bike, plane, train, boat, helicopter, motorbike, subway, taxi, truck",
      "Từ vựng về hoạt động hàng ngày: wake up, get up, brush teeth, wash face, have breakfast, go to school, study, play, sleep",
      "Từ vựng về bộ phận cơ thể: head, eyes, ears, nose, mouth, hands, feet, arms, legs, fingers, toes, neck, shoulder",
      "Từ vựng về đồ vật trong lớp học: desk, board, eraser, ruler, scissors, glue, notebook, backpack, pencil case, chalk",
      "Từ vựng về quần áo: shirt, pants, dress, shoes, hat, jacket, socks, skirt, sweater, coat, shorts, uniform",
      "Từ vựng về thức ăn và đồ uống: pizza, hamburger, noodles, soup, juice, tea, coffee, sandwich, salad, chicken, fish, vegetables",
      "Từ vựng về địa điểm: school, hospital, supermarket, park, library, zoo, museum, cinema, restaurant, bank, post office",
      "Từ vựng về gia đình mở rộng: uncle, aunt, cousin, nephew, niece, parents, grandparents, relatives",
      
      // === NGỮ PHÁP CƠ BẢN ===
      "Điền động từ to be: He ___ a teacher. She ___ happy. They ___ students. I ___ tired. We ___ friends.",
      "Điền từ sở hữu: This is ___ book. (my/your/his/her/our/their) - That is ___ pencil.",
      "Chia động từ đơn giản thì hiện tại: She ___ (like/likes) apples. He ___ (play/plays) soccer. It ___ (rain/rains) today.",
      "Câu hỏi What/Where/Who/When/How: ___ is your name? ___ do you live? ___ old are you? ___ is your birthday?",
      "Điền giới từ: The cat is ___ the table. The ball is ___ the box. (on/in/under/next to/behind/between/in front of)",
      "Câu phủ định: I ___ like fish. She ___ play tennis. They ___ have homework. (do not / does not)",
      "So sánh hơn đơn giản: big -> bigger, small -> smaller, tall -> taller, fast -> faster, slow -> slower",
      
      // === NÂNG CAO 30% - DẠNG BÀI MỚI ===
      "Sắp xếp từ thành câu hoàn chỉnh: (is / This / my / friend / best) -> ? | (school / go / I / to / every day) -> ?",
      "Sắp xếp câu phức tạp hơn: (likes / She / to / books / read / at night) -> ? | (playing / We / enjoy / in the park / football) -> ?",
      "Chọn từ đúng điền vào câu: I ___ breakfast at 7 o'clock. (have/has/having) | She ___ to music every day. (listen/listens/listening)",
      "Chia động từ thì hiện tại đơn: My mother ___ (cook) dinner every evening. My father ___ (work) in an office.",
      "Câu hỏi Yes/No: ___ you like pizza? ___ she go to school? ___ they have a pet? (Do/Does)",
      "Trả lời câu hỏi ngắn: Do you have a pet? - Yes, I ___. / No, I ___. Does he like sports? - Yes, he ___ / No, he ___.",
      "Từ vựng về thời gian: morning, afternoon, evening, night, today, tomorrow, yesterday, this week, next week, last week",
      "Từ vựng về số thứ tự: first (1st), second (2nd), third (3rd), fourth (4th), fifth (5th) - Hỏi viết hoặc nhận biết",
      "Đọc hiểu câu đơn giản: 'Tom has a cat. The cat is black and white.' -> What color is Tom's cat? | 'Mary goes to school at 7. She studies English.' -> What does Mary do?",
      "Điền từ trái nghĩa: hot - ___ (cold), big - ___ (small), happy - ___ (sad), fast - ___ (slow), old - ___ (young/new)",
      "Hoàn thành đoạn hội thoại: A: How are you? B: I ___ fine, thank you. A: What ___ your name? B: ___ name is Lan.",
      "Câu mệnh lệnh: ___ the door, please. (Open/Close/Don't open) | ___ quiet in the library! (Be/Don't be)",
      "Câu có 'there is/there are': ___ a book on the table. ___ two cats in the garden. ___ some water in the glass.",
      "Đại từ nhân xưng: ___ is my friend. (He/She/It/They) - chọn đúng cho ngữ cảnh | ___ are playing football. (We/They/He)",
      "Từ vựng về ngày trong tuần: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday - Hỏi viết hoặc thứ tự",
      "Từ vựng về tháng trong năm: January, February, March... December - Hỏi viết hoặc tháng thứ mấy",
      "Câu hỏi với 'How many/How much': ___ apples are there? ___ water do you need? - Trả lời phù hợp",
      "Từ vựng về cảm xúc: excited, scared, angry, surprised, worried, bored, tired, hungry, thirsty, sleepy",
      
      // === NÂNG CAO THÊM - ĐỌC HIỂU & VIẾT ===
      "Đọc đoạn văn ngắn và trả lời: 'This is my room. It has a bed, a desk and a window. I like my room.' -> What does the room have?",
      "Chọn câu đúng ngữ pháp: A) He go to school. B) He goes to school. C) He going to school.",
      "Điền từ nối: I like apples ___ oranges. (and/but/or) | She is tired ___ she is happy. (and/but/because)",
      "Hỏi về thói quen: What ___ you do every morning? What ___ she eat for breakfast? (do/does)",
      "Từ vựng về tính từ: beautiful, handsome, ugly, clean, dirty, new, old, expensive, cheap, heavy, light",
      "Hoàn thành email đơn giản: Dear ___. How ___ you? I am ___. See you soon!",
      "Từ vựng về thể thao: soccer, basketball, volleyball, swimming, running, badminton, tennis, cycling, skating",
      "Câu với 'can/can't': She ___ swim very well. He ___ speak English. I ___ play the piano. (can/can't)",
      "Từ vựng về thiên nhiên: tree, flower, river, mountain, sea, beach, forest, garden, sun, moon, star, cloud",
      "Chọn đáp án đúng cho câu hỏi: 'What time do you wake up?' - A) At 6 o'clock B) In my room C) With my brother"
    ];
    
    const randomMathTopic = mathGrade3Topics[Math.floor(Math.random() * mathGrade3Topics.length)];
    const randomEnglishTopic = grade === 2 
      ? englishGrade2Topics[Math.floor(Math.random() * englishGrade2Topics.length)]
      : englishGrade3Topics[Math.floor(Math.random() * englishGrade3Topics.length)];
    
    const systemPrompt = isMath
      ? `Bạn là giáo viên Toán vui nhộn cho học sinh lớp ${grade}. Tạo 1 bài toán phù hợp với trình độ:
         - Lớp 2: Cộng trừ trong 100, bảng nhân 2-5
         - Lớp 3: ${randomMathTopic}
         
         QUAN TRỌNG với lớp 3 (Phúc Khang):
         - CHỈ dùng số trong phạm vi từ 0 đến 100 (BÉ CHƯA HỌC SỐ LỚN HƠN 100!)
         - Kết quả của phép tính PHẢI nằm trong phạm vi 0-100
         - Câu hỏi phải rõ ràng, dễ hiểu với trẻ em
         - Đáp án phải chính xác về mặt toán học
         - Các đáp án sai phải hợp lý (không quá khác biệt)`
      : `Bạn là giáo viên Tiếng Anh vui nhộn cho học sinh lớp ${grade}. Tạo 1 bài tập Tiếng Anh:
         Dạng bài: ${randomEnglishTopic}
         
         QUAN TRỌNG:
         - Câu hỏi phải phù hợp với trình độ lớp ${grade}
         - Sử dụng từ vựng đơn giản, dễ hiểu
         - Có thể hỏi bằng Tiếng Việt hoặc Tiếng Anh
         - Đáp án sai phải hợp lý, không quá dễ đoán
         - Trong phần explanation, LUÔN dịch đầy đủ câu hỏi và đáp án đúng sang tiếng Việt để bé dễ hiểu
         - KHÔNG sử dụng dạng bài hỏi "What is this? (picture of ...)" vì hệ thống không hỗ trợ hiển thị hình ảnh
         - Thay vào đó, hãy dùng các dạng bài như: dịch từ, điền từ, chọn nghĩa đúng, sắp xếp câu, v.v.`;

    const userPrompt = isMath 
      ? `Tạo 1 câu hỏi trắc nghiệm cho ${playerName}. Trả về JSON với format:
{
  "question": "Câu hỏi",
  "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
  "correctAnswer": 0,
  "explanation": "Giải thích ngắn gọn"
}
Chỉ trả về JSON, không có text khác.`
      : `Tạo 1 câu hỏi trắc nghiệm cho ${playerName}. 

QUAN TRỌNG: KHÔNG tạo bài tập dạng "What is this?" kèm mô tả hình ảnh như "(picture of a table)" vì hệ thống không hiển thị được hình ảnh.

Thay vào đó, hãy tạo các dạng bài như:
- Dịch từ tiếng Anh sang tiếng Việt hoặc ngược lại
- Điền từ vào chỗ trống
- Chọn nghĩa đúng của từ
- Hoàn thành câu
- Chọn từ đúng để điền vào câu

Trả về JSON với format:
{
  "question": "Câu hỏi bằng tiếng Anh",
  "questionVi": "Dịch câu hỏi sang tiếng Việt",
  "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
  "correctAnswer": 0,
  "explanation": "Giải thích bằng tiếng Việt, dịch đầy đủ câu hỏi và các từ vựng quan trọng"
}
Chỉ trả về JSON, không có text khác.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }
    
    const exercise = JSON.parse(jsonMatch[0]);
    
    // Shuffle options to prevent first answer from always being correct
    if (exercise.options && exercise.options.length > 0 && typeof exercise.correctAnswer === 'number') {
      const correctOption = exercise.options[exercise.correctAnswer];
      
      // Create array of indices and shuffle
      const indices = exercise.options.map((_: any, i: number) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      
      // Reorder options based on shuffled indices
      const shuffledOptions = indices.map((i: number) => exercise.options[i]);
      
      // Find new position of correct answer
      const newCorrectAnswer = shuffledOptions.indexOf(correctOption);
      
      exercise.options = shuffledOptions;
      exercise.correctAnswer = newCorrectAnswer;
    }
    
    return new Response(JSON.stringify(exercise), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
