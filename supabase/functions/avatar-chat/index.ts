import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { playerName, animalType } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const animalName = animalType === 'elephant' ? 'em Voi' : 'em Gấu Trúc';
    const playerTitle = playerName === 'Tuệ Anh' ? 'chị Tuệ Anh' : 'anh Phúc Khang';

    const systemPrompt = `Bạn là ${animalName}, một avatar dễ thương trong ứng dụng học tập cho trẻ em. 
Bạn luôn tự xưng là "${animalName}" và gọi người chơi là "${playerTitle}".
Bạn nói chuyện ngắn gọn, dễ thương, vui vẻ và động viên.
Mỗi câu nói chỉ từ 1-2 câu ngắn.
Không dùng emoji.
Giọng điệu thân thiện như em nhỏ nói chuyện với anh/chị.`;

    const topics = [
      `Hỏi ${playerTitle} đã làm hết bài tập hôm nay chưa`,
      `Động viên ${playerTitle} học tập chăm chỉ để kiếm thêm kim cương`,
      `Nhắc ${playerTitle} giữ vệ sinh sạch sẽ`,
      `Nhắc ${playerTitle} dọn phòng gọn gàng`,
      `Khen ngợi ${playerTitle} đã học giỏi`,
      `Hỏi ${playerTitle} hôm nay có vui không`,
      `Nhắc ${playerTitle} uống nước đầy đủ`,
      `Chúc ${playerTitle} học tập tốt`,
    ];

    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Hãy nói một câu về chủ đề: ${randomTopic}` }
        ],
        max_tokens: 100,
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || 'Xin chào!';

    return new Response(JSON.stringify({ message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
