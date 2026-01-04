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

interface EnglishTopic {
  id: string;
  unit: string;
  name: string;
  vocabulary?: string[];
  structures?: string[];
  phonics?: string[];
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

// ============================================
// CHỦ ĐỀ TIẾNG ANH LỚP 2 - THEO SÁCH I-LEARN SMART START
// ============================================
const englishGrade2Topics: EnglishTopic[] = [
  // === GETTING STARTED: Numbers 1-10 & Age ===
  {
    id: "numbers_1_10",
    unit: "Getting Started",
    name: "Số đếm 1-10",
    vocabulary: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
    structures: ["How old are you?", "I'm [number]."],
    context: "Hỏi và trả lời về tuổi, đếm số từ 1 đến 10",
    needsImage: true,
    imagePrompt: "Colorful number cards 1-10 with cute cartoon characters, birthday cake with candles, children celebrating, kid-friendly educational style"
  },
  // === UNIT 1: Feelings ===
  {
    id: "feelings",
    unit: "Unit 1",
    name: "Cảm xúc (Feelings)",
    vocabulary: ["scared", "bored", "hungry", "thirsty", "happy", "sad"],
    structures: ["What's your name?", "My name's [name].", "[Name]'s [feeling]."],
    context: "Hỏi tên và mô tả cảm xúc của mình và bạn bè",
    needsImage: true,
    imagePrompt: "Six cartoon children showing different emotions: scared, bored, hungry, thirsty, happy, sad, with labels, Vietnamese classroom setting, colorful kid-friendly style"
  },
  // === GETTING STARTED LESSON 2: Classroom Commands ===
  {
    id: "classroom_commands",
    unit: "Getting Started",
    name: "Lệnh trong lớp học",
    vocabulary: ["open", "close", "book", "hands up", "hands down"],
    structures: ["Open your book!", "Close your book!", "Hands up!", "Hands down!"],
    context: "Các câu lệnh cơ bản trong lớp học, trò chơi Simon says",
    needsImage: true,
    imagePrompt: "Vietnamese classroom scene with teacher giving commands, students opening/closing books, raising hands, Simon Says game, colorful educational illustration"
  },
  // === PHONICS Unit 1-2: Letters Nn, Oo, Pp, Qq ===
  {
    id: "phonics_n_o",
    unit: "Phonics 1",
    name: "Âm N và O",
    phonics: ["Nn - nut, nose", "Oo - octopus, orange"],
    vocabulary: ["nut", "nose", "octopus", "orange"],
    structures: ["This is an octopus.", "This is a nut."],
    context: "Học âm và từ vựng bắt đầu bằng N và O",
    needsImage: true,
    imagePrompt: "Phonics illustration showing letter N with nut and nose images, letter O with octopus and orange, colorful alphabet learning card, kid-friendly style"
  },
  {
    id: "phonics_p_q",
    unit: "Phonics 2",
    name: "Âm P và Q",
    phonics: ["Pp - pen, penguin", "Qq - queen, question"],
    vocabulary: ["pen", "penguin", "queen", "question"],
    structures: ["This is a pen.", "I have a penguin."],
    context: "Học âm và từ vựng bắt đầu bằng P và Q",
    needsImage: true,
    imagePrompt: "Phonics illustration showing letter P with pen and penguin images, letter Q with queen and question mark, colorful alphabet cards, kid-friendly educational style"
  },
  // === UNIT 3: Numbers 11-20 ===
  {
    id: "numbers_11_20",
    unit: "Unit 3",
    name: "Số đếm 11-20",
    vocabulary: ["eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"],
    structures: ["How many [objects] are there?", "There are [number] [objects].", "Eleven triangles.", "Twelve circles."],
    context: "Đếm số lượng hình, đồ vật từ 11 đến 20",
    needsImage: true,
    imagePrompt: "Counting exercise with 11-20 colorful shapes: triangles, circles, squares arranged in groups, number labels, kid-friendly math educational style"
  },
  // === UNIT 3 LESSON 3: Where are you from? ===
  {
    id: "where_from",
    unit: "Unit 3",
    name: "Bạn đến từ đâu?",
    vocabulary: ["Hanoi", "Da Nang", "Ho Chi Minh City", "Hue", "Hai Phong", "Nha Trang", "Da Lat", "New York"],
    structures: ["Where are you from?", "I'm from [city]."],
    context: "Hỏi và trả lời về nơi đến, các thành phố Việt Nam",
    needsImage: true,
    imagePrompt: "Map of Vietnam with major cities marked: Hanoi, Da Nang, Ho Chi Minh City, Hue, Hai Phong, cute cartoon children pointing to cities, colorful kid-friendly style"
  },
  // === UNIT 4: Animals ===
  {
    id: "animals",
    unit: "Unit 4",
    name: "Động vật nông trại",
    vocabulary: ["duck", "goat", "pig", "cow", "bird", "chicken"],
    structures: ["What's that?", "It's a [animal]."],
    context: "Hỏi và trả lời về động vật nông trại",
    needsImage: true,
    imagePrompt: "Cute cartoon farm animals: duck, goat, pig, cow, chicken, bird in a colorful farm setting, Vietnamese countryside background, kid-friendly educational illustration"
  },
  // === PHONICS Unit 4: Letters Rr, Ss ===
  {
    id: "phonics_r_s",
    unit: "Phonics 4",
    name: "Âm R và S",
    phonics: ["Rr - rabbit, robot", "Ss - sea, sun"],
    vocabulary: ["rabbit", "robot", "sea", "sun"],
    structures: ["This is a rabbit.", "I have a robot."],
    context: "Học âm và từ vựng bắt đầu bằng R và S",
    needsImage: true,
    imagePrompt: "Phonics illustration showing letter R with rabbit and robot, letter S with sea and sun, bright colorful alphabet learning cards, kid-friendly educational style"
  },
  // === UNIT 5: Free Time Activities ===
  {
    id: "free_time_games",
    unit: "Unit 5",
    name: "Các trò chơi",
    vocabulary: ["soccer", "tag", "hopscotch", "hide and seek"],
    structures: ["Let's play [game].", "OK!"],
    context: "Rủ bạn chơi các trò chơi ngoài trời",
    needsImage: true,
    imagePrompt: "Vietnamese children playing outdoor games: soccer, tag, hopscotch, hide and seek, colorful playground scene, happy kids, kid-friendly cartoon style"
  },
  {
    id: "free_time_hobbies",
    unit: "Unit 5",
    name: "Sở thích cá nhân",
    vocabulary: ["listen to music", "ride my bike", "read books", "eat snacks"],
    structures: ["I [hobby].", "I listen to music.", "I ride my bike."],
    context: "Nói về sở thích cá nhân và hoạt động thường làm",
    needsImage: true,
    imagePrompt: "Cartoon children doing hobbies: listening to music with headphones, riding bicycle, reading books, eating snacks, colorful happy scenes, kid-friendly style"
  },
  // === GREETINGS AND CELEBRATIONS ===
  {
    id: "greetings_celebrations",
    unit: "Unit 5",
    name: "Chào hỏi và lễ hội",
    vocabulary: ["Happy New Year", "Merry Christmas", "Happy birthday", "Thank you"],
    structures: ["Happy New Year!", "Merry Christmas!", "Happy birthday!", "Thank you."],
    context: "Lời chúc mừng trong các dịp lễ",
    needsImage: true,
    imagePrompt: "Vietnamese celebration scenes: New Year with fireworks and red envelopes, Christmas tree, birthday cake with candles, children saying thank you, colorful festive style"
  },
  // === PHONICS Unit 5: Letters Tt, Uu ===
  {
    id: "phonics_t_u",
    unit: "Phonics 5",
    name: "Âm T và U",
    phonics: ["Tt - tiger, top", "Uu - umbrella, uncle"],
    vocabulary: ["tiger", "top", "umbrella", "uncle"],
    structures: ["This is my umbrella.", "This is a tiger."],
    context: "Học âm và từ vựng bắt đầu bằng T và U",
    needsImage: true,
    imagePrompt: "Phonics illustration showing letter T with tiger and spinning top, letter U with umbrella and uncle character, colorful alphabet learning cards, kid-friendly style"
  },
  // === REVIEW: Shapes ===
  {
    id: "shapes",
    unit: "Review",
    name: "Các hình dạng",
    vocabulary: ["circle", "square", "triangle", "rectangle"],
    structures: ["What shape is it?", "It's a [shape]."],
    context: "Nhận biết và nói về các hình dạng cơ bản",
    needsImage: true,
    imagePrompt: "Colorful geometric shapes: red circle, blue square, yellow triangle, green rectangle, with labels, educational math shapes for grade 2, clean style"
  },
  // === MIXED TOPICS ===
  {
    id: "a_an_usage",
    unit: "Grammar",
    name: "Sử dụng a/an",
    vocabulary: ["a cat", "an apple", "a book", "an orange", "a dog", "an elephant"],
    structures: ["This is a [noun].", "This is an [noun]."],
    context: "Phân biệt khi nào dùng 'a' và khi nào dùng 'an'",
    needsImage: false
  },
  {
    id: "colors",
    unit: "Review",
    name: "Màu sắc",
    vocabulary: ["red", "blue", "green", "yellow", "orange", "pink", "purple", "brown", "black", "white"],
    structures: ["What color is it?", "It's [color].", "The [object] is [color]."],
    context: "Hỏi và trả lời về màu sắc của đồ vật",
    needsImage: true,
    imagePrompt: "Rainbow of colors with labeled color spots: red, blue, green, yellow, orange, pink, purple, colorful crayons and paint splashes, kid-friendly educational style"
  }
];

// Hàm tạo hình ảnh bằng Gemini 2.5 Flash Image Generation
async function generateImage(prompt: string, apiKey: string, grade: number, subject: string): Promise<string | null> {
  try {
    const gradeText = grade === 2 ? "grade 2" : "grade 3";
    const subjectText = subject === "math" ? "math" : "English";
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ 
            text: `Generate an educational illustration for a Vietnamese ${gradeText} ${subjectText} exercise: ${prompt}. The image should be colorful, kid-friendly, cute cartoon style, and clearly show the educational concept. Simple and clear for young students.`
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
    const mathTopics = grade === 2 ? mathGrade2Topics : mathGrade3Topics;
    const randomMathTopic = mathTopics[Math.floor(Math.random() * mathTopics.length)];
    const randomEnglishTopic = englishGrade2Topics[Math.floor(Math.random() * englishGrade2Topics.length)];

    let systemPrompt: string;
    let userPrompt: string;
    let generatedImage: string | null = null;

    if (isMath) {
      // Tạo hình ảnh nếu bài toán cần
      if (randomMathTopic.needsImage && randomMathTopic.imagePrompt) {
        console.log("Generating image for math topic:", randomMathTopic.name);
        generatedImage = await generateImage(randomMathTopic.imagePrompt, GEMINI_API_KEY, grade, "math");
      }

      systemPrompt = `Bạn là giáo viên Toán lớp ${grade} theo chương trình sách giáo khoa Việt Nam.
      
CHỦ ĐỀ BÀI TẬP: ${randomMathTopic.name}
${randomMathTopic.examples ? `VÍ DỤ THAM KHẢO: ${randomMathTopic.examples.join(", ")}` : ""}
${randomMathTopic.context ? `NGỮ CẢNH BÀI TOÁN: ${randomMathTopic.context}` : ""}

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

      userPrompt = `Tạo 1 câu hỏi trắc nghiệm Toán lớp ${grade} cho ${playerName} theo chủ đề: ${randomMathTopic.name}

${randomMathTopic.context ? `Dựa vào ngữ cảnh: ${randomMathTopic.context}` : ""}

Trả về JSON với format:
{
  "question": "Câu hỏi bài toán (có thể là bài toán có lời văn hoặc phép tính)",
  "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
  "correctAnswer": 0,
  "explanation": "Giải thích cách làm bài chi tiết, từng bước"
}
Chỉ trả về JSON thuần (không markdown, không code fence), không có text khác.`;

    } else {
      // ENGLISH - BÁM SÁT SÁCH I-LEARN SMART START LỚP 2

      // Tạo hình ảnh nếu cần
      if (randomEnglishTopic.needsImage && randomEnglishTopic.imagePrompt) {
        console.log("Generating image for English topic:", randomEnglishTopic.name);
        generatedImage = await generateImage(randomEnglishTopic.imagePrompt, GEMINI_API_KEY, grade, "english");
      }

      systemPrompt = `Bạn là giáo viên Tiếng Anh lớp 2 chuyên nghiệp, tạo bài tập THEO SÁCH I-LEARN SMART START.

=== THÔNG TIN CHỦ ĐỀ ===
Unit: ${randomEnglishTopic.unit}
Tên bài: ${randomEnglishTopic.name}
${randomEnglishTopic.vocabulary ? `Từ vựng: ${randomEnglishTopic.vocabulary.join(", ")}` : ""}
${randomEnglishTopic.structures ? `Cấu trúc câu: ${randomEnglishTopic.structures.join(" / ")}` : ""}
${randomEnglishTopic.phonics ? `Phonics: ${randomEnglishTopic.phonics.join(", ")}` : ""}
${randomEnglishTopic.context ? `Ngữ cảnh: ${randomEnglishTopic.context}` : ""}

=== QUY TẮC TẠO BÀI TẬP ===

1. CHỈ SỬ DỤNG TỪ VỰNG VÀ CẤU TRÚC TRONG CHỦ ĐỀ
2. DẠNG BÀI ĐA DẠNG (chọn ngẫu nhiên 1 dạng):
   - Điền từ vào chỗ trống: "I'm ___ Hanoi." (from)
   - Sắp xếp từ thành câu: "(play / Let's / soccer)" → "Let's play soccer."
   - Chọn câu trả lời đúng: "How old are you?" → "I'm seven."
   - Ghép từ với nghĩa: "hungry" = "đói"
   - Phonics - chọn từ bắt đầu bằng âm: "Which word starts with 'P'?" → "pen"
   - Chọn từ đúng để hoàn thành câu: "What's ___?" → "that"
   - Đếm số lượng: "How many circles? (hình 15 vòng tròn)" → "fifteen"
   - True/False với câu đơn giản

3. ĐỘ KHÓ PHÙ HỢP LỚP 2:
   - Câu ngắn gọn, dễ hiểu
   - Từ vựng đơn giản, quen thuộc
   - Có hình ảnh minh họa nếu cần

4. ĐÁP ÁN SAI PHẢI HỢP LÝ:
   - Là các lỗi thường gặp của học sinh lớp 2
   - Không quá khác biệt so với đáp án đúng

5. GIẢI THÍCH BẰNG TIẾNG VIỆT:
   - Dễ hiểu cho trẻ em
   - Có ví dụ bổ sung nếu cần`;

      userPrompt = `Tạo 1 câu hỏi trắc nghiệm Tiếng Anh lớp 2 cho ${playerName}.

Chủ đề: ${randomEnglishTopic.unit} - ${randomEnglishTopic.name}

YÊU CẦU:
- Bám sát từ vựng và cấu trúc đã cho
- Tạo dạng bài ĐA DẠNG và THÚ VỊ
- Phù hợp với học sinh lớp 2

Trả về JSON với format:
{
  "question": "Câu hỏi bằng tiếng Anh (rõ ràng, dễ hiểu)",
  "questionVi": "Dịch/hướng dẫn bằng tiếng Việt",
  "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
  "correctAnswer": 0,
  "explanation": "Giải thích bằng tiếng Việt dễ hiểu"
}
Chỉ trả về JSON thuần (không markdown, không code fence), không có text khác.`;
    }

    // Gọi Gemini 2.5 Pro API (tạo bài tập)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
        }],
        generationConfig: {
          temperature: 0.3,
          topP: 0.9,
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
    
    // Parse JSON from response (robust)
    const cleaned = String(content || "")
      .replace(/```json\s*/gi, "")
      .replace(/```/g, "")
      .trim();

    const extractFirstJsonObject = (s: string): string | null => {
      const start = s.indexOf("{");
      if (start < 0) return null;

      let depth = 0;
      let inString = false;
      let escape = false;

      for (let i = start; i < s.length; i++) {
        const ch = s[i];
        if (inString) {
          if (escape) {
            escape = false;
          } else if (ch === "\\\\") {
            escape = true;
          } else if (ch === '"') {
            inString = false;
          }
          continue;
        }

        if (ch === '"') {
          inString = true;
        } else if (ch === "{") {
          depth++;
        } else if (ch === "}") {
          depth--;
          if (depth === 0) return s.slice(start, i + 1);
        }
      }
      return null;
    };

    let exercise: any;
    try {
      exercise = JSON.parse(cleaned);
    } catch {
      const jsonText = extractFirstJsonObject(cleaned);
      if (!jsonText) throw new Error("Invalid response format");
      exercise = JSON.parse(jsonText);
    }
    
    // Thêm hình ảnh nếu có
    if (generatedImage) {
      exercise.image = generatedImage;
      exercise.hasImage = true;
    }
    
    // Thêm thông tin chủ đề để hiển thị
    if (isMath) {
      exercise.topicName = randomMathTopic.name;
    } else {
      exercise.topicName = `${randomEnglishTopic.unit} - ${randomEnglishTopic.name}`;
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
