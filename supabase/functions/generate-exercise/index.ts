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
    
    const randomTopic = mathGrade3Topics[Math.floor(Math.random() * mathGrade3Topics.length)];
    
    const systemPrompt = isMath
      ? `Bạn là giáo viên Toán vui nhộn cho học sinh lớp ${grade}. Tạo 1 bài toán phù hợp với trình độ:
         - Lớp 2: Cộng trừ trong 100, bảng nhân 2-5
         - Lớp 3: ${randomTopic}
         QUAN TRỌNG với lớp 3:
         - CHỈ dùng số trong phạm vi từ 0 đến 1000
         - Câu hỏi phải rõ ràng, dễ hiểu với trẻ em
         - Đáp án phải chính xác về mặt toán học
         - Các đáp án sai phải hợp lý (không quá khác biệt)`
      : `Bạn là giáo viên Tiếng Anh vui nhộn cho học sinh lớp ${grade}. Tạo 1 bài tập từ vựng đơn giản:
         - Hỏi nghĩa của từ tiếng Anh cơ bản
         - Hoặc hỏi từ tiếng Anh của một từ tiếng Việt
         Chủ đề: động vật, màu sắc, đồ vật, gia đình, số đếm.`;

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
