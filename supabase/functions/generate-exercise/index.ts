import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Định nghĩa kiểu cho topic
interface MathTopic {
  id: string;
  name: string;
  examples?: string[];
  context?: string;
  needsImage: boolean;
  imagePrompt?: string;
}

// Các chủ đề Toán lớp 3 theo sách giáo khoa
const mathGrade3Topics: MathTopic[] = [
  // === CHƯƠNG 7: ÔN TẬP HỌC KỲ 1 ===
  {
    id: "tinh_nham_100_1000",
    name: "Tính nhẩm trong phạm vi 100-1000",
    examples: ["20×3", "40×2", "50×2", "30×3", "60:2", "80:4", "90:3", "100:5"],
    needsImage: false
  },
  {
    id: "dat_tinh_roi_tinh",
    name: "Đặt tính rồi tính",
    examples: ["34×2", "15×6", "23×4", "69:3", "84:7", "95:8", "122×4", "327×3", "715:5", "645:3"],
    needsImage: false
  },
  {
    id: "dung_sai_phep_tinh",
    name: "Đúng/Sai phép tính đặt dọc",
    examples: ["114×6=684", "510:5=12", "17×5=55", "86:6=14 dư 2"],
    needsImage: false
  },
  {
    id: "tim_thanh_phan",
    name: "Tìm thành phần chưa biết",
    examples: ["?×6=186", "?:7=105", "72:?=8", "X+25=67", "84-X=39", "X×5=35"],
    needsImage: false
  },
  // === BÀI TOÁN CÓ LỜI VĂN VỚI HÌNH ẢNH ===
  {
    id: "bai_toan_hai_hoa",
    name: "Bài toán hái hoa (gấp lần)",
    context: "Mi hái được 25 bông hoa, Mai hái được số bông hoa gấp 3 lần của Mi. Hỏi cả hai chị em hái được bao nhiêu bông hoa?",
    needsImage: true,
    imagePrompt: "Cute cartoon illustration of two Vietnamese girls picking colorful flowers in a beautiful garden, one girl holding a small basket of flowers, another holding more flowers, bright sunny day, kid-friendly style"
  },
  {
    id: "bai_toan_can_nang",
    name: "Bài toán cân nặng con vật",
    context: "Con ngỗng cân nặng 6 kg. Con chó nặng gấp 2 lần con ngỗng. Con lợn nặng gấp 5 lần con chó. Hỏi con lợn cân nặng bao nhiêu ki-lô-gam?",
    needsImage: true,
    imagePrompt: "Cute cartoon illustration showing three animals: a white goose (6kg), a yellow dog (12kg), and a pink pig (60kg), with weight labels, kid-friendly educational style, clean background"
  },
  {
    id: "bai_toan_xe_cho_khach",
    name: "Bài toán xe chở khách",
    context: "Hai xe ô tô chở học sinh đi thăm Lăng Bác Hồ, mỗi xe chở 45 học sinh. Hỏi có tất cả bao nhiêu học sinh đi thăm Lăng Bác Hồ?",
    needsImage: true,
    imagePrompt: "Two cute cartoon school buses full of happy Vietnamese students in uniforms, driving towards Ho Chi Minh Mausoleum in the background, patriotic educational illustration, kid-friendly"
  },
  {
    id: "bai_toan_xep_banh",
    name: "Bài toán xếp bánh vào hộp",
    context: "Các bạn xếp 256 cái bánh vào các hộp, mỗi hộp 8 cái bánh. Hỏi các bạn xếp được bao nhiêu hộp bánh như vậy?",
    needsImage: true,
    imagePrompt: "Cute cartoon Vietnamese children putting moon cakes into gift boxes, table with many delicious cakes and colorful boxes, festive atmosphere, kid-friendly illustration"
  },
  {
    id: "bai_toan_thuyen_du_lich",
    name: "Bài toán thuyền du lịch",
    context: "Thuyền lớn chở 24 khách du lịch, thuyền nhỏ chở 6 khách du lịch. Hỏi thuyền lớn chở nhiều hơn thuyền nhỏ bao nhiêu khách? Số khách ở thuyền lớn gấp mấy lần số khách ở thuyền nhỏ?",
    needsImage: true,
    imagePrompt: "Beautiful Vietnamese river scene with a large tourist boat and a small boat, tourists wearing life vests, limestone mountains in background like Ha Long Bay, colorful kid-friendly illustration"
  },
  // === SO SÁNH SỐ LỚN GẤP MẤY LẦN SỐ BÉ ===
  {
    id: "so_sanh_gap_lan",
    name: "So sánh số lớn gấp mấy lần số bé",
    examples: ["Số lớn: 6, số bé: 2 → gấp 3 lần", "Số lớn: 10, số bé: 5 → gấp 2 lần"],
    needsImage: false
  },
  {
    id: "do_dai_gap_lan",
    name: "Đoạn thẳng dài gấp mấy lần",
    context: "Đoạn thẳng AB dài 8 cm, đoạn thẳng CD dài 2 cm. Hỏi đoạn thẳng AB dài gấp mấy lần đoạn thẳng CD?",
    needsImage: true,
    imagePrompt: "Educational math illustration showing two line segments labeled A-B (8cm long, blue) and C-D (2cm short, red) with measurement rulers, clean white background, kid-friendly style"
  },
  // === BIỂU THỨC SỐ ===
  {
    id: "bieu_thuc_hai_phep",
    name: "Tính giá trị biểu thức có 2 phép tính",
    examples: ["35+8-10", "27-7+30", "60+50-20", "9×4"],
    needsImage: false
  },
  {
    id: "bieu_thuc_co_ngoac",
    name: "Biểu thức có ngoặc",
    examples: ["2×(3+4)", "45:(5+4)", "30:(20-15)", "8×(11-6)", "42-(42-5)"],
    needsImage: false
  },
  {
    id: "bieu_thuc_nhan_chia_truoc",
    name: "Biểu thức nhân chia trước, cộng trừ sau",
    examples: ["30:5×2", "24+8:2", "24+5×6", "30-18:3", "10-2×3"],
    needsImage: false
  },
  // === PHÉP CHIA TRONG PHẠM VI 1000 ===
  {
    id: "chia_so_co_3_chu_so",
    name: "Chia số có 3 chữ số cho số có 1 chữ số",
    examples: ["462:3", "403:3", "518:5", "844:8", "714:7", "102:5"],
    needsImage: false
  },
  {
    id: "chia_co_du",
    name: "Chia có dư",
    examples: ["216:7=30 dư 6", "423:6=70 dư 3", "237:5", "428:6"],
    needsImage: false
  },
  {
    id: "tinh_nham_chia_tram",
    name: "Tính nhẩm chia số tròn trăm",
    examples: ["600:2=300", "600:3=200", "800:2=400", "400:4=100"],
    needsImage: false
  },
  // === GIẢM/TĂNG SỐ LẦN ===
  {
    id: "giam_gap_lan",
    name: "Giảm số đi một số lần",
    examples: ["12 giảm 3 lần = 4", "15 giảm 3 lần = ?", "18 giảm 3 lần = ?", "144m giảm 3 lần", "264 phút giảm 8 lần"],
    needsImage: false
  },
  {
    id: "gap_so_lan",
    name: "Gấp số lên một số lần",
    examples: ["12 gấp 4 lần = 48", "15 gấp 4 lần = ?", "18 gấp 4 lần = ?"],
    needsImage: false
  },
  // === TÌM CHỮ SỐ THÍCH HỢP ===
  {
    id: "tim_chu_so",
    name: "Tìm chữ số thích hợp",
    examples: ["1?2 × 4 = 60?", "3? × 7 = ??6"],
    needsImage: false
  },
  // === BÀI TOÁN VỀ PHÂN SỐ ĐƠN GIẢN ===
  {
    id: "phan_so_ngoi_sao",
    name: "Bài toán phân số với ngôi sao",
    context: "Có 15 ngôi sao. 1/3 số ngôi sao là ? ngôi sao. 1/5 số ngôi sao là ? ngôi sao.",
    needsImage: true,
    imagePrompt: "15 golden stars arranged in 3 rows of 5, some stars highlighted to show fractions, kid-friendly educational math illustration, clean background"
  }
];

// Các chủ đề Toán lớp 2 (cho Phúc Khang)
const mathGrade2Topics: MathTopic[] = [
  {
    id: "cong_tru_100",
    name: "Cộng trừ trong phạm vi 100",
    examples: ["45+38", "67+29", "83-47", "92-56"],
    needsImage: false
  },
  {
    id: "bang_nhan_2_5",
    name: "Bảng nhân 2, 3, 4, 5",
    examples: ["2×7", "3×8", "4×6", "5×9"],
    needsImage: false
  },
  {
    id: "bang_chia_2_5", 
    name: "Bảng chia 2, 3, 4, 5",
    examples: ["18:2", "24:3", "36:4", "45:5"],
    needsImage: false
  }
];

// Hàm tạo hình ảnh bằng AI
async function generateImage(prompt: string, apiKey: string): Promise<string | null> {
  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [
          { 
            role: "user", 
            content: `Generate an educational illustration for a Vietnamese grade 3 math problem: ${prompt}. The image should be colorful, kid-friendly, and clearly show the mathematical concept.`
          }
        ],
      }),
    });

    if (!response.ok) {
      console.error("Image generation failed:", response.status);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    // Kiểm tra xem có hình ảnh base64 trong response không
    if (content && content.includes("data:image")) {
      const base64Match = content.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/);
      if (base64Match) {
        return base64Match[0];
      }
    }
    
    // Kiểm tra inline_data trong parts
    const parts = data.choices?.[0]?.message?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inline_data?.data) {
          return `data:image/${part.inline_data.mime_type?.split('/')[1] || 'png'};base64,${part.inline_data.data}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}

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
    
    // Chọn topics theo lớp
    const topics = grade === 2 ? mathGrade2Topics : mathGrade3Topics;
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    // English topics cho Phúc Khang (lớp 2) và Tuệ Anh (lớp 3)
    const englishGrade2Topics = [
      "Từ vựng về động vật: dog, cat, bird, fish, elephant, lion, monkey",
      "Từ vựng về màu sắc: red, blue, green, yellow, orange, pink, purple",
      "Từ vựng về đồ vật: table, chair, bed, door, window, book, pen",
      "Số đếm 1-20: one, two, three... twenty",
      "Điền từ còn thiếu: I ___ a student. (am/is/are)"
    ];
    
    const englishGrade3Topics = [
      "Từ vựng về nghề nghiệp: teacher, doctor, nurse, farmer, driver",
      "Từ vựng về thời tiết: sunny, rainy, cloudy, windy, hot, cold",
      "Điền động từ to be: He ___ a teacher. She ___ happy.",
      "Câu hỏi What/Where/Who: ___ is your name? ___ do you live?",
      "Sắp xếp từ thành câu: (is / This / my / friend)",
      "So sánh hơn: big -> bigger, small -> smaller"
    ];
    
    const randomEnglishTopic = grade === 2 
      ? englishGrade2Topics[Math.floor(Math.random() * englishGrade2Topics.length)]
      : englishGrade3Topics[Math.floor(Math.random() * englishGrade3Topics.length)];

    let systemPrompt: string;
    let userPrompt: string;
    let generatedImage: string | null = null;

    if (isMath) {
      // Tạo hình ảnh nếu bài toán cần
      if (randomTopic.needsImage && randomTopic.imagePrompt) {
        console.log("Generating image for topic:", randomTopic.name);
        generatedImage = await generateImage(randomTopic.imagePrompt, LOVABLE_API_KEY);
      }

      systemPrompt = `Bạn là giáo viên Toán lớp ${grade} theo chương trình sách giáo khoa Việt Nam.
      
CHỦ ĐỀ BÀI TẬP: ${randomTopic.name}
${randomTopic.examples ? `VÍ DỤ THAM KHẢO: ${randomTopic.examples.join(", ")}` : ""}
${randomTopic.context ? `NGỮ CẢNH BÀI TOÁN: ${randomTopic.context}` : ""}

QUAN TRỌNG cho lớp 3 (Tuệ Anh):
- Phạm vi tính toán: 0 đến 1000
- Kết quả phép tính PHẢI chính xác
- Bài toán có lời văn phải có ngữ cảnh thực tế, gần gũi với trẻ em Việt Nam
- Sử dụng đơn vị đo: kg, m, cm, lít, cái, con, bông, chiếc...
- Đáp án sai phải hợp lý, có thể là kết quả của lỗi tính toán thường gặp

QUAN TRỌNG cho lớp 2 (Phúc Khang):
- Phạm vi tính toán: 0 đến 100
- Bài tập đơn giản, rõ ràng`;

      userPrompt = `Tạo 1 câu hỏi trắc nghiệm Toán lớp ${grade} cho ${playerName} theo chủ đề: ${randomTopic.name}

${randomTopic.context ? `Dựa vào ngữ cảnh: ${randomTopic.context}` : ""}

Trả về JSON với format:
{
  "question": "Câu hỏi bài toán (có thể là bài toán có lời văn hoặc phép tính)",
  "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
  "correctAnswer": 0,
  "explanation": "Giải thích cách làm bài chi tiết, từng bước"
}
Chỉ trả về JSON, không có text khác.`;

    } else {
      systemPrompt = `Bạn là giáo viên Tiếng Anh vui nhộn cho học sinh lớp ${grade}. Tạo 1 bài tập Tiếng Anh:
Dạng bài: ${randomEnglishTopic}

QUAN TRỌNG:
- Câu hỏi phải phù hợp với trình độ lớp ${grade}
- Sử dụng từ vựng đơn giản, dễ hiểu
- KHÔNG dùng dạng bài "What is this? (picture of ...)"
- Trong explanation, dịch đầy đủ sang tiếng Việt`;

      userPrompt = `Tạo 1 câu hỏi trắc nghiệm Tiếng Anh cho ${playerName}.

Trả về JSON với format:
{
  "question": "Câu hỏi bằng tiếng Anh",
  "questionVi": "Dịch câu hỏi sang tiếng Việt",
  "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
  "correctAnswer": 0,
  "explanation": "Giải thích bằng tiếng Việt"
}
Chỉ trả về JSON, không có text khác.`;
    }

    // Gọi AI để tạo bài tập với model gemini-2.5-pro cho chất lượng cao
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Hệ thống đang bận, vui lòng thử lại sau." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Đã hết lượt sử dụng, vui lòng nạp thêm." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
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
    
    // Thêm hình ảnh nếu có
    if (generatedImage) {
      exercise.image = generatedImage;
      exercise.hasImage = true;
    }
    
    // Thêm thông tin chủ đề để hiển thị
    if (isMath) {
      exercise.topicName = randomTopic.name;
    }
    
    // Shuffle options để đáp án không luôn ở vị trí đầu
    if (exercise.options && exercise.options.length > 0 && typeof exercise.correctAnswer === 'number') {
      const correctOption = exercise.options[exercise.correctAnswer];
      
      const indices = exercise.options.map((_: any, i: number) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      
      const shuffledOptions = indices.map((i: number) => exercise.options[i]);
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
