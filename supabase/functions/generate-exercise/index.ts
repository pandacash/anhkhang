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
    
    const mathGrade3Topics = [
      "Bảng nhân chia 6, 7, 8, 9, 10 (VD: 7 x 8 = ?, 63 : 9 = ?)",
      "Phép nhân số có 2-3 chữ số với số có 1 chữ số trong phạm vi 1000 (VD: 125 x 4 = ?)",
      "Phép chia số có 2-3 chữ số cho số có 1 chữ số (VD: 248 : 4 = ?)",
      "Tìm X trong biểu thức đơn giản (VD: X + 15 = 50, X x 3 = 27)",
      "Tính giá trị biểu thức có dấu ngoặc (VD: (12 + 8) x 3 = ?)",
      "Đổi đơn vị đo độ dài: mm, cm, dm, m, km (VD: 5m = ? cm)",
      "Đổi đơn vị đo khối lượng: gam, kg (VD: 2kg = ? gam)",
      "Bài toán về thời gian: giờ, phút, tháng, năm (VD: 2 giờ = ? phút)",
      "Tính chu vi hình vuông, hình chữ nhật (VD: Hình vuông cạnh 5cm, tính chu vi)",
      "Tính diện tích hình vuông, hình chữ nhật (VD: Hình chữ nhật dài 6cm rộng 4cm)",
      "Giải toán có lời văn: hơn kém (VD: Lan có 25 viên bi, Hoa có ít hơn 8 viên. Hỏi Hoa có mấy viên?)",
      "Giải toán có lời văn: gấp lần (VD: Số A là 12, số B gấp 3 lần số A. Tính số B?)",
      "Giải toán có lời văn: mua sắm với tiền Việt Nam (VD: Mẹ mua 3 quyển vở, mỗi quyển 5000 đồng)",
      "So sánh số trong phạm vi 1000 (VD: 456 ... 465, điền dấu >, <, =)"
    ];
    
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
      "Từ vựng về nghề nghiệp: teacher, doctor, nurse, farmer, driver, police officer",
      "Từ vựng về thời tiết: sunny, rainy, cloudy, windy, hot, cold",
      "Từ vựng về các môn học: Math, English, Science, Music, Art, P.E.",
      "Điền động từ to be: He ___ a teacher. She ___ happy. They ___ students.",
      "Điền từ sở hữu: This is ___ book. (my/your/his/her)",
      "Chia động từ đơn giản: She ___ (like/likes) apples.",
      "Câu hỏi What/Where/Who: ___ is your name? ___ do you live?",
      "Điền giới từ: The cat is ___ the table. (on/in/under)",
      "Từ vựng về phương tiện: car, bus, bike, plane, train, boat",
      "Đặt câu với từ cho sẵn: (is / This / my / friend) -> ?",
      "Từ vựng về hoạt động: run, jump, swim, read, write, sing, dance",
      "Câu phủ định: I ___ like fish. (do not / does not)",
      "Từ vựng về bộ phận cơ thể: head, eyes, ears, nose, mouth, hands, feet",
      "So sánh hơn đơn giản: big -> bigger, small -> smaller"
    ];
    
    const randomMathTopic = mathGrade3Topics[Math.floor(Math.random() * mathGrade3Topics.length)];
    const randomEnglishTopic = grade === 2 
      ? englishGrade2Topics[Math.floor(Math.random() * englishGrade2Topics.length)]
      : englishGrade3Topics[Math.floor(Math.random() * englishGrade3Topics.length)];
    
    const systemPrompt = isMath
      ? `Bạn là giáo viên Toán vui nhộn cho học sinh lớp ${grade}. Tạo 1 bài toán phù hợp với trình độ:
         - Lớp 2: Cộng trừ trong 100, bảng nhân 2-5
         - Lớp 3: ${randomMathTopic}
         QUAN TRỌNG với lớp 3:
         - CHỈ dùng số trong phạm vi từ 0 đến 1000
         - Câu hỏi phải rõ ràng, dễ hiểu với trẻ em
         - Đáp án phải chính xác về mặt toán học
         - Các đáp án sai phải hợp lý (không quá khác biệt)`
      : `Bạn là giáo viên Tiếng Anh vui nhộn cho học sinh lớp ${grade}. Tạo 1 bài tập Tiếng Anh:
         Dạng bài: ${randomEnglishTopic}
         
         QUAN TRỌNG:
         - Câu hỏi phải phù hợp với trình độ lớp ${grade}
         - Sử dụng từ vựng đơn giản, dễ hiểu
         - Có thể hỏi bằng Tiếng Việt hoặc Tiếng Anh
         - Đáp án sai phải hợp lý, không quá dễ đoán`;

    const userPrompt = `Tạo 1 câu hỏi trắc nghiệm cho ${playerName}. Trả về JSON với format:
{
  "question": "Câu hỏi",
  "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
  "correctAnswer": 0,
  "explanation": "Giải thích ngắn gọn"
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
