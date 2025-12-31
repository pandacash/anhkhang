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

// Các chủ đề Toán lớp 2 (cho Phúc Khang) - theo sách giáo khoa
const mathGrade2Topics: MathTopic[] = [
  // === CHỦ ĐỀ 5: LÀM QUEN VỚI HÌNH PHẲNG ===
  {
    id: "diem_doan_thang",
    name: "Điểm, đoạn thẳng",
    examples: ["Điểm A, B, C", "Đoạn thẳng AB, CD", "Nối điểm A với điểm B tạo thành đoạn thẳng"],
    context: "Nhận biết điểm và đoạn thẳng trong hình vẽ",
    needsImage: true,
    imagePrompt: "Educational math illustration showing points labeled A, B, C and line segments connecting them, with a ruler measuring the segments, clean simple style for grade 2 students"
  },
  {
    id: "duong_thang_duong_cong",
    name: "Đường thẳng, đường cong, ba điểm thẳng hàng",
    examples: ["Vạch kẻ đường có dạng đường thẳng", "Cầu vồng có dạng đường cong", "Ba điểm M, N, P thẳng hàng"],
    context: "Phân biệt đường thẳng và đường cong, nhận biết ba điểm thẳng hàng",
    needsImage: true,
    imagePrompt: "Educational illustration showing straight lines with rulers and curved rainbow arcs, three aligned points labeled M N P on a straight line, kid-friendly colorful style"
  },
  {
    id: "duong_gap_khuc",
    name: "Đường gấp khúc",
    examples: ["Đường gấp khúc ABC gồm 2 đoạn thẳng AB và BC", "Tính độ dài đường gấp khúc MNPQ = MN + NP + PQ"],
    context: "Đường gấp khúc gồm nhiều đoạn thẳng nối với nhau",
    needsImage: true,
    imagePrompt: "Educational math illustration showing a zigzag path with points labeled A B C D, measuring the lengths of each segment, cute staircase example, clean background for grade 2"
  },
  {
    id: "hinh_tu_giac",
    name: "Hình tứ giác",
    examples: ["Hình tứ giác có 4 cạnh và 4 đỉnh", "Đếm số hình tứ giác trong hình vẽ"],
    context: "Nhận biết và đếm hình tứ giác",
    needsImage: true,
    imagePrompt: "Colorful educational illustration showing various quadrilaterals shapes, some overlapping to count, kid-friendly geometric shapes for grade 2 students"
  },
  {
    id: "ve_doan_thang",
    name: "Vẽ đoạn thẳng có độ dài cho trước",
    examples: ["Vẽ đoạn thẳng AB dài 5 cm", "Vẽ đoạn thẳng CD dài 12 cm"],
    context: "Dùng thước kẻ vẽ đoạn thẳng có độ dài cho trước",
    needsImage: true,
    imagePrompt: "Educational illustration showing a ruler with centimeter markings (0-15cm), a pencil drawing a line segment from 0 to 7cm, points labeled A and B, clean simple style"
  },
  {
    id: "do_do_dai_doan_thang",
    name: "Đo độ dài đoạn thẳng",
    examples: ["Đoạn thẳng AB dài 5 cm", "Đoạn thẳng MN dài 8 cm"],
    context: "Dùng thước đo độ dài đoạn thẳng theo cm",
    needsImage: true,
    imagePrompt: "Educational illustration showing a ruler measuring different line segments, with measurements clearly marked in centimeters, clean style for grade 2 students"
  },
  {
    id: "gap_cat_ghep_hinh",
    name: "Gấp, cắt, ghép, xếp hình",
    examples: ["Gấp hình chữ nhật từ giấy", "Ghép 2 hình tam giác thành hình vuông"],
    context: "Thực hành gấp giấy và ghép hình",
    needsImage: true,
    imagePrompt: "Cute cartoon showing paper folding steps, scissors cutting shapes, and geometric shapes being assembled together, colorful origami style for children"
  },
  // === CHỦ ĐỀ 6: NGÀY GIỜ, NGÀY THÁNG ===
  {
    id: "ngay_gio_phut",
    name: "Ngày - Giờ, Giờ - Phút",
    examples: ["1 ngày = 24 giờ", "1 giờ = 60 phút", "7 giờ sáng = 07:00", "2 giờ chiều = 14:00"],
    context: "Một ngày có 24 giờ. Một giờ có 60 phút. Đọc giờ trên đồng hồ.",
    needsImage: true,
    imagePrompt: "Educational clock face showing different times, day and night cycle illustration, cute cartoon showing morning 7:00, afternoon 14:00, evening activities, kid-friendly style"
  },
  {
    id: "xem_dong_ho",
    name: "Xem đồng hồ (giờ đúng và giờ phút)",
    examples: ["2 giờ", "9 giờ 30 phút", "7 giờ 15 phút", "5 giờ 45 phút"],
    context: "Xem kim đồng hồ để biết mấy giờ, mấy phút",
    needsImage: true,
    imagePrompt: "Four analog clocks showing different times: 2:00, 9:30, 7:15, and 5:45, clear hour and minute hands, colorful kid-friendly design, each clock labeled A B C D"
  },
  {
    id: "hoat_dong_trong_ngay",
    name: "Hoạt động trong ngày theo giờ",
    context: "Nam làm gì lúc mấy giờ? Em đi học lúc 7 giờ sáng, ăn trưa lúc 11 giờ 30 phút, học bài lúc 2 giờ chiều.",
    needsImage: true,
    imagePrompt: "Cute cartoon daily schedule: child waking up at 6:00, going to school at 7:00, eating lunch at 11:30, doing homework at 14:00, sleeping at 21:00, Vietnamese school uniform"
  },
  {
    id: "ngay_thang",
    name: "Ngày - Tháng",
    examples: ["Tháng 1 có 31 ngày", "Tháng 2 có 28 hoặc 29 ngày", "Tháng 4 có 30 ngày"],
    context: "Đọc lịch, biết số ngày trong tháng. Tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày. Tháng 4, 6, 9, 11 có 30 ngày.",
    needsImage: true,
    imagePrompt: "Vietnamese calendar page showing a month with dates, weekdays labeled Hai Ba Tu Nam Sau Bay CN, some important dates circled, cherry blossoms decoration"
  },
  {
    id: "xem_lich",
    name: "Xem lịch và trả lời câu hỏi",
    examples: ["Tháng 5 có bao nhiêu ngày?", "Ngày 19 tháng 5 là thứ mấy?", "Ngày Quốc tế Thiếu nhi 1 tháng 6 là thứ mấy?"],
    context: "Xem tờ lịch rồi trả lời câu hỏi về ngày, thứ",
    needsImage: true,
    imagePrompt: "Vietnamese calendar showing May with 31 days, important date May 19 circled (Ho Chi Minh birthday), weekdays in Vietnamese, colorful kid-friendly design"
  },
  {
    id: "ngay_le_viet_nam",
    name: "Các ngày lễ quan trọng",
    examples: ["Ngày 2/9 là Quốc khánh", "Ngày 20/11 là Nhà giáo Việt Nam", "Ngày 1/6 là Quốc tế Thiếu nhi", "Ngày 8/3 là Quốc tế Phụ nữ"],
    context: "Nhận biết các ngày lễ quan trọng trong năm",
    needsImage: true,
    imagePrompt: "Collage of Vietnamese holidays: National Day Sep 2 with flag, Teachers Day Nov 20 with flowers, Childrens Day Jun 1 with balloons, Women Day Mar 8 with roses, cute cartoon style"
  },
  // === TÍNH TOÁN TRONG PHẠM VI 100 ===
  {
    id: "cong_tru_100",
    name: "Cộng trừ trong phạm vi 100",
    examples: ["25+65-30=60", "90-40-26=24", "5+61+8=74", "32+48-16"],
    needsImage: false
  },
  {
    id: "cong_tru_nhieu_so",
    name: "Cộng trừ nhiều số liên tiếp",
    examples: ["25+65-30", "90-40-26", "32+48+16", "34-7-8"],
    needsImage: false
  },
  {
    id: "tim_so_thich_hop",
    name: "Tìm số thích hợp điền vào chỗ trống",
    examples: ["60-?=51 (đáp án: 9)", "42-?<38 (đáp án: >4)", "?+16=53"],
    needsImage: false
  },
  {
    id: "so_sanh_bieu_thuc",
    name: "So sánh biểu thức điền >, <, =",
    examples: ["32+4 ? 18 (>)", "60-9 > 5?", "42-4 < 38+?"],
    needsImage: false
  },
  // === BÀI TOÁN CÓ LỜI VĂN ===
  {
    id: "bai_toan_bac_thang",
    name: "Bài toán bậc thang",
    context: "Cầu thang lên nhà sóc có 32 bậc thang. Sóc đã leo được 9 bậc thang. Hỏi sóc cần leo thêm bao nhiêu bậc thang nữa để vào nhà?",
    needsImage: true,
    imagePrompt: "Cute cartoon squirrel climbing stairs to a treehouse, 32 steps total, squirrel at step 9, forest background, kid-friendly illustration"
  },
  {
    id: "bai_toan_nhan_vo",
    name: "Bài toán nhãn vở",
    context: "Tổ có 20 cái nhãn vở, Mai có 15 cái nhãn vở. Số nhãn vở của Nam nhiều hơn của Mai nhưng ít hơn của Tổ. Tìm số nhãn vở của Robot.",
    needsImage: true,
    imagePrompt: "Cute cartoon Vietnamese students comparing notebook stickers, one student has 20, one has 15, another counting between 15-20, colorful classroom scene"
  },
  {
    id: "bai_toan_duong_gap_khuc",
    name: "Bài toán độ dài đường gấp khúc",
    context: "Đường gấp khúc ABC có AB = 4 cm và BC = 6 cm. Tính độ dài đường gấp khúc ABC.",
    needsImage: true,
    imagePrompt: "Educational diagram showing a zigzag path ABC with segment AB = 4cm and BC = 6cm, ruler markings, clean geometric illustration for grade 2"
  },
  {
    id: "bai_toan_so_sanh",
    name: "Bài toán so sánh bút chì",
    context: "Bút chì dài 10 cm, bút sáp dài 5 cm, cái ghim dài 2 cm. Bút chì dài gấp mấy lần bút sáp? Bút chì dài gấp mấy lần cái ghim?",
    needsImage: true,
    imagePrompt: "Educational illustration showing a pencil 10cm, crayon 5cm, and paper clip 2cm with measurements marked, comparing lengths, clean simple style"
  }
];

// Hàm tạo hình ảnh bằng Gemini API trực tiếp
async function generateImage(prompt: string, apiKey: string, grade: number): Promise<string | null> {
  try {
    const gradeText = grade === 2 ? "grade 2" : "grade 3";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ 
            text: `Generate an educational illustration for a Vietnamese ${gradeText} math problem: ${prompt}. The image should be colorful, kid-friendly, and clearly show the mathematical concept. Simple and clear style for young students.`
          }]
        }],
        generationConfig: {
          responseModalities: ["TEXT", "IMAGE"]
        }
      }),
    });

    if (!response.ok) {
      console.error("Image generation failed:", response.status, await response.text());
      return null;
    }

    const data = await response.json();
    
    // Kiểm tra inline_data trong parts của Gemini response
    const parts = data.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData?.data) {
          return `data:image/${part.inlineData.mimeType?.split('/')[1] || 'png'};base64,${part.inlineData.data}`;
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
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
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
        generatedImage = await generateImage(randomTopic.imagePrompt, GEMINI_API_KEY, grade);
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
- Bài tập đơn giản, rõ ràng
- Chủ đề hình học: điểm, đoạn thẳng, đường gấp khúc, hình tứ giác
- Chủ đề thời gian: xem đồng hồ (giờ đúng, giờ phút), đọc lịch, các ngày lễ
- Đơn vị đo độ dài: cm
- Sử dụng bối cảnh gần gũi: trường học, nhà, vườn, đồ dùng học tập`;

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

    // Gọi Gemini API trực tiếp với gemini-2.0-flash
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
        }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Hệ thống đang bận, vui lòng thử lại sau." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      throw new Error("Gemini API error: " + errorText);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
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
