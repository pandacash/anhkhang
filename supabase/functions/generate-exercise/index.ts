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
    
    const systemPrompt = isMath
      ? `Bạn là giáo viên Toán vui nhộn cho học sinh lớp ${grade}. Tạo 1 bài toán phù hợp với trình độ:
         - Lớp 2: Cộng trừ trong 100, bảng nhân 2-5
         - Lớp 3: Nhân chia, phép tính hỗn hợp đơn giản
         Câu hỏi phải rõ ràng, dễ hiểu với trẻ em.`
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
