"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
const RAW = [
  [31,"Giai cấp công nhân hiện đại hình thành và phát triển trong xã hội nào?",["Công xã nguyên thuỷ","Chiếm hữu nô lệ","Phong kiến","Tư bản chủ nghĩa"],3,2],
  [32,"Giai cấp nào sau đây KHÔNG có hệ tư tưởng riêng?",["Giai cấp nông dân","Giai cấp công nhân","Giai cấp tư sản","Giai cấp địa chủ"],0,2],
  [33,"Nội dung nào sau đây KHÔNG thuộc đặc điểm của giai cấp công nhân về phương diện kinh tế?",["Sản xuất bằng máy móc","Có ý thức tổ chức kỉ luật","Năng suất lao động cao","Lao động xã hội hoá"],1,2],
  [34,"Trong chủ nghĩa tư bản, giai cấp nào không có tư liệu sản xuất, phải bán sức lao động và bị bóc lột giá trị thặng dư?",["Giai cấp nông dân","Giai cấp công nhân","Giai cấp tư sản","Tầng lớp trí thức"],1,2],
  [35,"Chọn cụm từ phù hợp: '...còn .... lại là sản phẩm của bản thân nền đại công nghiệp'",["Giai cấp tư sản","Giai cấp nông dân","Giai cấp vô sản","Giai cấp địa chủ"],2,2],
  [36,"Cùng với sự phát triển của nền sản xuất đại công nghiệp, giai cấp công nhân như thế nào?",["Giảm về số lượng, nâng cao về chất lượng","Tăng về số lượng, nâng cao về chất lượng","Ngày càng giảm về số lượng","Bị bóc lột ít hơn"],1,2],
  [37,"Trong xã hội tư bản chủ nghĩa, giai cấp công nhân phát triển là do",["Quá trình tích luỹ nguyên thuỷ tư bản","Bị bóc lột giá trị thặng dư","Sự phát triển của nền đại công nghiệp","Sự thống trị của giai cấp tư sản"],2,2],
  [38,"Bộ phận nào sau đây KHÔNG thuộc giai cấp công nhân?",["Người lao động trực tiếp đứng máy trong công xưởng","Quản đốc trong công xưởng","Người lao động tự do, giáo viên","Thợ sửa máy trong công xưởng"],2,2],
  [39,"Giai cấp, tầng lớp nào đại diện cho lực lượng sản xuất tiên tiến dưới chủ nghĩa tư bản?",["Tầng lớp trí thức","Giai cấp công nhân","Giai cấp tư sản","Tầng lớp doanh nhân"],1,2],
  [40,"Trong xã hội tư bản chủ nghĩa, giai cấp công nhân đại diện cho phương thức sản xuất nào?",["Phương thức sản xuất tư bản chủ nghĩa","Phương thức sản xuất tiền tư bản","Phương thức sản xuất cộng sản","Phương thức sản xuất phong kiến"],0,2],
  [41,"Ở các nước tư bản, xét về chính trị - xã hội, giai cấp công nhân là những người",["Sở hữu tư liệu sản xuất và tạo ra của cải","Không có tư liệu sản xuất, phải làm thuê cho giai cấp tư sản","Cùng với giai cấp tư sản làm chủ tư liệu sản xuất","Làm thuê cho nhà tư bản và không bị bóc lột"],1,2],
  [42,"Giai cấp công nhân có sứ mệnh lịch sử thực hiện cách mạng xã hội chủ nghĩa vì",["Họ là giai cấp đông đảo về số lượng","Họ tạo ra phần lớn của cải cho xã hội","Họ gắn liền với lực lượng sản xuất tiên tiến","Họ bị bóc lột nặng nề nhất"],2,2],
  [43,"Sứ mệnh lịch sử của giai cấp công nhân là nhằm",["Đưa xã hội loài người lên chủ nghĩa cộng sản","Tạo ra sự giàu có cho chủ nghĩa tư bản","Đưa chủ nghĩa tư bản phát triển ở trình độ cao hơn","Củng cố địa vị của chủ nghĩa tư bản"],0,2],
  [44,"Nội dung sứ mệnh lịch sử của giai cấp công nhân là",["Xoá bỏ chế độ tư bản, xây dựng chế độ cộng sản chủ nghĩa","Xoá bỏ chế độ phong kiến, xây dựng chế độ tư bản","Xoá bỏ chế độ chiếm hữu nô lệ, xây dựng chế độ phong kiến","Xoá bỏ chế độ chiếm hữu nô lệ, xây dựng chế độ tư bản"],0,2],
  [45,"Mục tiêu cuối cùng trong sứ mệnh lịch sử của giai cấp công nhân là",["Trở thành giai cấp nắm quyền lực nhà nước","Giải phóng mình và toàn xã hội khỏi mọi áp bức bóc lột","Đánh đổ chế độ tư bản chủ nghĩa","Đánh đổ chế độ phong kiến"],1,2],
  [46,"Điều kiện khách quan quan trọng nhất quy định sứ mệnh lịch sử của giai cấp công nhân?",["Có số lượng đông đảo trong xã hội","Tạo ra của cải làm giàu cho xã hội","Chủ thể của lực lượng sản xuất tiên tiến","Là giai cấp bị bóc lột nặng nề nhất"],2,2],
  [47,"Nhân tố chủ quan quan trọng nhất để giai cấp công nhân thực hiện thắng lợi sứ mệnh lịch sử là",["Phát triển nhanh về số lượng","Tạo được tình thế cách mạng","Có sự lãnh đạo của Đảng Cộng sản","Liên minh được với nông dân"],2,2],
  [48,"Đảng Cộng sản là tổ chức chính trị đại biểu cho giai cấp nào?",["Tầng lớp trí thức","Giai cấp công nhân","Giai cấp nông dân","Tầng lớp tiểu tư sản"],1,2],
  [49,"Một quốc gia không giàu tài nguyên vẫn thành cường quốc kinh tế nếu có yếu tố nào?",["Vị trí địa lí thuận lợi","Nguồn nhân lực chất lượng cao","Dân số đông và cơ cấu hợp lí","Đường lối ngoại giao phù hợp"],1,2],
  [50,"Sự kiện nào quyết định lấy ngày 01/5 làm ngày biểu dương lực lượng giai cấp vô sản thế giới?",["Tuyên ngôn của Đảng Cộng sản năm 1848","Đại hội thành lập Quốc tế I năm 1864","Đại hội thành lập Quốc tế II năm 1889","Đại hội thành lập Quốc tế Cộng sản năm 1919"],2,2],
  [51,"Sự khác nhau căn bản giữa giai cấp công nhân ở nước tư bản và nước xã hội chủ nghĩa thể hiện ở",["Sản phẩm lao động do công nhân tạo ra","Nguồn gốc và thành phần xuất thân","Quan hệ sở hữu đối với tư liệu sản xuất chủ yếu","Phương thức lao động, phương thức sản xuất"],2,2],
  [52,"Trong Cách mạng công nghiệp 4.0, giai cấp công nhân biến đổi theo xu hướng nào?",["Công nhân trí thức có xu hướng tăng nhanh","Tăng về số lượng, giảm về chất lượng","Không ngừng giảm về số lượng","Tăng về chất lượng, giảm về số lượng"],0,2],
  [53,"Phương án nào KHÔNG phải điểm biến đổi của giai cấp công nhân hiện nay so với cuối thế kỉ XIX?",["Tăng nhanh về số lượng, chất lượng","Biến đổi lớn về cơ cấu","Ở nước tư bản, giai cấp công nhân không còn bị bóc lột","Xu hướng trí tuệ hoá tăng nhanh"],2,2],
  [54,"Giai cấp công nhân Việt Nam ra đời khi nào?",["Trước giai cấp tư sản Việt Nam","Sau giai cấp tư sản Việt Nam","Đồng thời với giai cấp tư sản Việt Nam","Khi Việt Nam tiến hành đổi mới"],0,2],
  [55,"Nhằm 'phát triển bền vững', giai cấp công nhân Việt Nam cần nâng cao yếu tố nào?",["Nhận thức chính trị","Đạo đức nghề nghiệp","Đạo đức sinh thái","Trình độ tay nghề"],2,2],
  [56,"Để đáp ứng nền kinh tế tri thức, giai cấp công nhân Việt Nam trước hết cần",["Củng cố đạo đức nghề nghiệp","Nâng cao trình độ tri thức","Nâng cao nhận thức chính trị","Có ý thức công dân"],1,2],
  [57,"Quan điểm 'Giữ vững bản chất giai cấp công nhân của Đảng...thích ứng với CMCN lần thứ tư' ở Đại hội nào?",["Đại hội X (2006)","Đại hội XI (2011)","Đại hội XII (2016)","Đại hội XIII (2021)"],3,2],
  [58,"Tổ chức nào được xem là đội tiên phong của giai cấp công nhân Việt Nam?",["Đảng Cộng sản Việt Nam","Hội liên hiệp các doanh nghiệp Việt Nam","Mặt trận Tổ quốc Việt Nam","Tổ chức Công đoàn Việt Nam"],0,2],
  [59,"Giai cấp công nhân Việt Nam cần ưu tiên hàng đầu phát triển yếu tố nào để thích ứng CMCN lần thứ tư?",["Nắm vững công nghệ tiên tiến","Tăng nhanh về số lượng","Đa dạng cơ cấu nghề nghiệp","Nâng cao trình độ văn hoá công nghiệp"],0,2],
  [60,"Lực lượng xã hội nào có thể gia nhập Đảng Cộng sản Việt Nam?",["Giai cấp công nhân và tầng lớp thanh niên","Giai cấp công nhân và đội ngũ trí thức","Những ai giác ngộ chủ nghĩa Mác - Lênin, tình nguyện vào Đảng","Giai cấp công nhân và giai cấp nông dân"],2,2],
  [61,"Cách tiếp cận nào về chủ nghĩa xã hội là SAI?",["Là ước mơ, nguyện vọng của nhân dân lao động về xã hội không có áp bức","Là phong trào đấu tranh thực tiễn của nhân dân lao động","Là khoa học nghiên cứu về sứ mệnh lịch sử của giai cấp công nhân","Là giai đoạn cao của hình thái kinh tế - xã hội cộng sản chủ nghĩa"],3,3],
  [62,"Sự phân kì hình thái kinh tế - xã hội cộng sản chủ nghĩa được C. Mác đề cập trong tác phẩm nào?",["Tuyên ngôn của Đảng cộng sản","Nội chiến ở Pháp","Phê phán cương lĩnh Gôta","Bộ Tư bản"],2,3],
  [63,"C. Mác dự báo hình thái KTXH cộng sản xuất hiện ở loại hình nước nào?",["Các nước tư bản phát triển","Các nước tư bản trung bình","Các nước tư bản thấp","Các nước phong kiến"],0,3],
  [64,"Nguyên tắc phân phối trong xã hội chủ nghĩa cộng sản theo chủ nghĩa Mác - Lênin là",["Làm theo năng lực, phân phối theo nhu cầu","Làm theo năng lực, phân phối theo lao động","Làm theo năng lực, phân phối theo phúc lợi xã hội","Làm theo năng lực, phân phối theo nhân khẩu"],0,3],
  [65,"Dự báo nào của C. Mác và Ph. Ăngghen về giai đoạn CAO của HTKTXH cộng sản chủ nghĩa?",["Tồn tại nhiều hình thức sở hữu","Không còn giai cấp và nhà nước","Tồn tại nhiều hình thức phân phối","Tồn tại nhiều hệ tư tưởng"],1,3],
  [66,"Dự báo nào của C. Mác và Ph. Ăngghen về giai đoạn THẤP của HTKTXH cộng sản chủ nghĩa?",["Tồn tại nhiều hình thức sở hữu và phân phối","Xã hội không còn giai cấp và nhà nước","Không còn sự đối lập giữa lao động trí óc và chân tay","Chỉ còn sở hữu toàn dân"],0,3],
  [67,"Hình thái KTXH cộng sản chủ nghĩa xuất hiện khi nào?",["Giai cấp công nhân thiết lập được nhà nước","Giai cấp công nhân thành lập được chính đảng","Mâu thuẫn giai cấp công nhân với tư sản trở nên quyết liệt","Giai cấp công nhân xây dựng xong cơ sở vật chất - kĩ thuật của CNXH"],0,3],
  [68,"Giai cấp công nhân sử dụng phương pháp đấu tranh chủ yếu nào để hoàn thành sứ mệnh lịch sử?",["Bạo lực cách mạng","Đấu tranh hoà bình","Phương pháp cải lương","Kết hợp bạo lực cách mạng và hoà bình"],3,3],
  [69,"Khái niệm 'thời kì quá độ chính trị' được C. Mác đề cập lần đầu trong tác phẩm nào?",["Phê phán cương lĩnh Gôta","Luận cương về Phoi-ơ-bắc","Tuyên ngôn của Đảng Cộng sản","Hệ tư tưởng Đức"],0,3],
  [70,"Điền vào chỗ chấm: 'Tôi coi sự thay đổi các hình thái kinh tế - xã hội là một quá trình …'",["Tất yếu khách quan","Lịch sử - tự nhiên","Không thể đảo ngược","Hợp với quy luật"],1,3],
  [71,"Hai tiền đề quan trọng cho sự ra đời của HTKTXH cộng sản chủ nghĩa là",["Sự phát triển lực lượng sản xuất và mâu thuẫn giai cấp","Sự phát triển đại công nghiệp và của giai cấp tư sản","Sự phát triển đại công nghiệp và phân hoá giàu nghèo","Sự phát triển lực lượng sản xuất và trưởng thành của giai cấp công nhân"],3,3],
  [72,"Cơ sở vật chất - kĩ thuật của nền sản xuất xã hội chủ nghĩa là",["Nền tiểu thủ công nghiệp","Nền nông nghiệp thủ công","Nền công nghiệp cơ khí","Nền đại công nghiệp"],3,3],
  [73,"Điền vào chỗ chấm (V.I. Lênin): 'Thiết lập một chế độ xã hội cao hơn CNTB, nghĩa là nâng cao ...'",["Năng suất lao động","Trình độ văn hoá","Nhận thức chính trị","Đời sống tinh thần"],0,3],
  [74,"Chế độ C. Mác đề cập: 'Nước Nga có thể không cần trải qua những đau khổ...' là chế độ nào?",["Công xã nguyên thuỷ","Chiếm hữu nô lệ","Phong kiến","Tư bản chủ nghĩa"],3,3],
  [75,"Gắn công nghiệp hoá với bảo vệ tài nguyên, môi trường là nội dung nào trong sứ mệnh lịch sử của GCCN?",["Nội dung chính trị - xã hội","Nội dung kinh tế - xã hội","Nội dung an ninh - quốc phòng","Nội dung văn hoá - tư tưởng"],1,3],
  [76,"Nền kinh tế Việt Nam hiện nay đang xây dựng là",["Nền kinh tế thị trường xã hội chủ nghĩa","Nền kinh tế thị trường định hướng xã hội chủ nghĩa","Nền kinh tế thị trường tự do","Nền kinh tế bao cấp"],1,3],
  [77,"Thực chất của thời kì quá độ lên chủ nghĩa xã hội là",["Không còn giai cấp và đấu tranh giai cấp","Chỉ còn kinh tế nhà nước, kinh tế tập thể","Tồn tại đan xen yếu tố xã hội mới và tàn tích xã hội cũ","Tiếp tục đấu tranh của GCCN chống giai cấp tư sản"],2,3],
  [78,"Theo V.I. Lênin, đặc điểm nổi bật trong lĩnh vực kinh tế của thời kì quá độ lên CNXH là",["Chỉ có kinh tế nhà nước","Chỉ có kinh tế nhà nước, kinh tế tập thể","Tồn tại nhiều thành phần kinh tế","Chỉ có kinh tế tư nhân"],2,3],
  [79,"Trong xu hướng 'Toàn cầu hoá', nội dung nào đóng vai trò chủ đạo?",["Toàn cầu hoá trên lĩnh vực kinh tế","Toàn cầu hoá trên lĩnh vực văn hoá","Toàn cầu hoá trên lĩnh vực quân sự","Toàn cầu hoá trên lĩnh vực an ninh"],0,3],
  [80,"Bảo vệ chủ nghĩa Mác - Lênin, chống xuyên tạc là thực hiện nội dung nào trong sứ mệnh lịch sử của GCCN?",["Lĩnh vực kinh tế - xã hội","Lĩnh vực chính trị - xã hội","Lĩnh vực văn hoá - tư tưởng","Lĩnh vực an ninh - quốc phòng"],2,3],
  [81,"Quá trình chuyển biến từ CNTB sang CNXH tất yếu phải có một thời kì lịch sử nhất định gọi là",["Thời kì quá độ","Chủ nghĩa xã hội","Chủ nghĩa cộng sản","Thời kì cái biến cách mạng"],0,3],
  [82,"Các nước đã trải qua giai đoạn TBCN phát triển đi lên CNXH, thuộc loại hình quá độ nào?",["Quá độ trực tiếp","Quá độ gián tiếp","Quá độ nhanh","Quá độ nhảy vọt"],0,3],
  [83,"Các nước quá độ từ xã hội tiền tư bản, bỏ qua giai đoạn TBCN đi lên CNXH, thuộc loại hình quá độ nào?",["Quá độ trực tiếp","Quá độ gián tiếp","Quá độ từ từ","Quá độ nhảy vọt"],1,3],
  [84,"Cương lĩnh xây dựng đất nước trong thời kì quá độ lên CNXH được Đảng thông qua ở Đại hội nào?",["Đại hội VI","Đại hội VII","Đại hội VIII","Đại hội IX"],1,3],
  [85,"Chủ thể của nhà nước Cộng hoà XHCN Việt Nam hiện nay là",["Đội ngũ trí thức","Giai cấp công nhân","Nhân dân","Giai cấp nông dân"],2,3],
  [86,"Chủ trương 'hoà nhập nhưng không hoà tan' thể hiện đặc trưng cơ bản nào của CNXH ở Việt Nam?",["Xây dựng xã hội dân giàu, nước mạnh, dân chủ, công bằng, văn minh","Xã hội do nhân dân lao động làm chủ","Có quan hệ hữu nghị và hợp tác với nhân dân các nước","Có nền văn hoá tiên tiến, đậm đà bản sắc dân tộc"],3,3],
  [87,"Tám đặc trưng cơ bản của CNXH mà Việt Nam đang xây dựng được Đảng thông qua tại Đại hội nào?",["Đại hội VI (1986)","Đại hội VII (1991)","Đại hội XI (2011)","Đại hội XIII (2021)"],2,3],
  [88,"Nội dung nào là đặc trưng cơ bản về chính trị của CNXH ở Việt Nam?",["Có nền kinh tế phát triển cao","Do nhân dân làm chủ","Có nền văn hoá tiên tiến, đậm đà bản sắc dân tộc","Con người có cuộc sống ấm no, hạnh phúc"],1,3],
  [89,"Các dân tộc trong cộng đồng Việt Nam bình đẳng, đoàn kết, tương trợ cùng tiến bộ là",["Một trong những đặc trưng cơ bản của CNXH ở Việt Nam","Nguyên tắc phát triển của đất nước","Biểu hiện của sự phát triển của các dân tộc","Mục tiêu phát triển của đất nước"],0,3],
  [90,"Lực lượng nòng cốt bảo vệ Tổ quốc Việt Nam XHCN là",["Đảng và Nhà nước","Thanh niên, sinh viên","Nhân dân lao động","Quân đội nhân dân, Công an nhân dân"],3,3],
  [91,"Theo Từ nguyên học, thuật ngữ 'dân chủ' được hiểu là",["Quyền lực thuộc về nhân dân","Quyền của con người","Quyền tự do của mỗi người","Là một trật tự xã hội"],0,4],
  [92,"Theo chủ nghĩa Mác - Lênin, xét về phương diện chế độ xã hội và chính trị, dân chủ được hiểu là",["Quyền lực thuộc về nhân dân","Một nguyên tắc tổ chức, quản lí xã hội","Một mô hình thức nhà nước","Quyền lực thuộc về tất cả mọi người"],2,4],
  [93,"Theo chủ nghĩa Mác - Lênin, xét về phương diện tổ chức, quản lí xã hội, dân chủ được hiểu là",["Nhân dân là chủ nhân của nhà nước","Một nguyên tắc tổ chức, quản lí xã hội","Một hình thức tồn tại nhà nước","Quyền lực thuộc về tất cả mọi người"],1,4],
  [94,"Theo tư tưởng Hồ Chí Minh, dưới góc độ giá trị xã hội mang tính nhân loại, dân chủ được hiểu là",["Thực thi công bằng trong xã hội","Một nguyên tắc tổ chức, quản lí xã hội","Dân là chủ và dân làm chủ","Quyền lực thuộc về tất cả mọi người"],2,4],
  [95,"Quan điểm xuyên suốt của Đảng Cộng sản Việt Nam về dân chủ là",["Đảm bảo quyền tự do cho nhân dân","Lấy dân làm gốc và phát huy quyền làm chủ của nhân dân","Đảm bảo quyền bình đẳng cho tất cả mọi người","Quyền lực thuộc về tất cả mọi người"],1,4],
  [96,"Khái niệm 'dân chủ' xuất hiện trong xã hội nào?",["Xã hội chiếm hữu nô lệ","Xã hội phong kiến","Xã hội tư bản chủ nghĩa","Xã hội công xã nguyên thuỷ"],0,4],
  [97,"Xã hội nào không tồn tại dân chủ với tư cách là một nền dân chủ?",["Xã hội chiếm hữu nô lệ","Xã hội phong kiến","Xã hội tư bản chủ nghĩa","Xã hội xã hội chủ nghĩa"],1,4],
  [98,"Tính giai cấp của dân chủ thể hiện ở chỗ quyền lực nhà nước do",["Nhân dân quy định","Giai cấp thống trị quy định","Giai cấp bị trị quy định","Thượng đế quy định"],1,4],
  [99,"Nền dân chủ do giai cấp thống trị đặt ra được thể chế hoá bằng",["Văn bản","Hợp đồng","Pháp luật","Quy tắc đạo đức"],2,4],
  [100,"Trong xã hội công xã nguyên thuỷ, dân chủ thuộc về hình thức nào?",["Dân chủ trực tiếp","Dân chủ gián tiếp","Dân chủ hỗn hợp","Dân chủ tập trung"],0,4],
  [101,"Trong xã hội chiếm hữu nô lệ, nhà nước chủ nô thực hiện quyền thống trị giai cấp trên cơ sở nào?",["Đa số đối với thiểu số","Thiểu số đối với đa số","Một người đối với tất cả","Nhân dân tự làm chủ"],1,4],
  [102,"Ph. Ăngghen gọi dân chủ trong xã hội nguyên thuỷ là gì?",["Dân chủ đại diện","Dân chủ tập trung","Dân chủ quân sự","Dân chủ dân sự"],2,4],
  [103,"Cách mạng dân chủ tư sản do giai cấp, tầng lớp nào lãnh đạo?",["Giai cấp công nhân","Giai cấp nông dân","Giai cấp tư sản","Tầng lớp trí thức"],2,4],
  [104,"Theo V.I. Lênin, cách mạng dân chủ tư sản kiểu mới do giai cấp nào lãnh đạo?",["Giai cấp công nhân","Giai cấp nông dân","Giai cấp tư sản","Tầng lớp tiểu tư sản"],0,4],
  [105,"Lực lượng xã hội nào giữ vai trò chủ đạo trong xây dựng nền dân chủ xã hội chủ nghĩa?",["Giai cấp tư sản và giai cấp công nhân","Giai cấp công nhân và nhân dân lao động","Tầng lớp trí thức và nhân dân lao động","Giai cấp nông dân và nhân dân lao động"],1,4],
  [106,"Nền dân chủ xã hội chủ nghĩa được phôi thai từ cuộc cách mạng nào?",["Công xã Pari 1871","Cách mạng Tháng Mười Nga 1917","Cách mạng dân tộc dân chủ Trung Quốc 1949","Cách mạng Tháng Tám 1945"],0,4],
  [107,"Nền dân chủ xã hội chủ nghĩa ra đời từ cuộc cách mạng nào?",["Cách mạng dân chủ tư sản Pháp 1789","Cách mạng Tháng Mười Nga 1917","Cách mạng dân tộc dân chủ Trung Quốc 1949","Cách mạng Tháng Tám 1945"],1,4],
  [108,"Nền dân chủ xã hội chủ nghĩa phải do tổ chức nào lãnh đạo?",["Công đoàn","Đảng Cộng sản","Các nghiệp đoàn","Đoàn thanh niên"],1,4],
  [109,"Dân chủ xã hội chủ nghĩa có điểm khác biệt cơ bản nào so với các nền dân chủ trước?",["Mang bản chất giai cấp","Quản lí nhà nước bằng pháp luật","Có tổ chức Đảng lãnh đạo","Dân chủ cho đa số nhân dân"],3,4],
  [110,"Nền dân chủ xã hội chủ nghĩa mang bản chất của giai cấp nào?",["Tầng lớp trí thức","Giai cấp công nhân","Giai cấp tư sản","Tầng lớp doanh nhân"],1,4],
  [111,"Chế độ dân chủ nhân dân ở nước ta được xác lập từ khi nào?",["Sau Cách mạng tháng Tám 1945","Sau năm 1954","Sau ngày 30/4/1975","Sau Đại hội đổi mới 1986"],0,4],
  [112,"Yếu tố nào có ý nghĩa quan trọng nhất trong việc thực thi nhà nước pháp quyền?",["Đề cao phục lợi xã hội","Tôn trọng tự do cá nhân","Phát huy quyền bình đẳng","Thượng tôn pháp luật"],3,4],
  [113,"Mục tiêu cuối cùng của cách mạng xã hội chủ nghĩa là gì?",["Giai cấp công nhân thiết lập nhà nước","Xoá bỏ chế độ tư bản chủ nghĩa","Giải phóng dân tộc","Giải phóng con người"],3,4],
  [114,"Nhà nước xã hội chủ nghĩa là nhà nước 'kiểu mới' vì dám bảo lợi ích cho",["Thiểu số giai cấp cầm quyền","Đa số nhân dân lao động","Thiểu số nhân dân lao động","Tất cả mọi người"],1,4],
  [115,"Chức năng cơ bản nhất của Mặt trận Tổ quốc Việt Nam hiện nay là gì?",["Cứu trợ nhân đạo","Phản biện xã hội","Kiểm soát nhà nước","Đoàn kết dân tộc"],3,4],
  [116,"Điền vào chỗ chấm: 'Dân giàu, nước mạnh, …, văn minh'",["Sáng tạo, công bằng","Dân chủ, công bằng","Phát triển, hiện đại","Dân chủ, hội nhập"],1,4],
  [117,"Nhà nước pháp quyền XHCN Việt Nam xét đến cùng được giám sát bởi",["Mặt trận Tổ quốc","Các tổ chức đoàn thể - xã hội","Nhân dân","Các tổ chức chính trị - xã hội"],2,4],
  [118,"Nhà nước 'của dân' có nghĩa là quyền lực thuộc về",["Giai cấp công nhân","Giai cấp nông dân","Nhân dân","Trí thức"],2,4],
  [119,"Nhà nước 'do dân' có nghĩa là bộ máy nhà nước do",["Giai cấp công nhân nắm giữ","Giai cấp nông dân nắm giữ","Nhân dân bầu ra","Trí thức nắm giữ"],2,4],
  [120,"Tư tưởng 'lấy dân làm gốc' được Đảng quán triệt lần đầu ở Đại hội nào?",["Đại hội VI (1986)","Đại hội VII (1991)","Đại hội VIII (1996)","Đại hội IX (2001)"],0,4],
  [121,"Cơ cấu xã hội là",["Tổng thể các lực lượng lao động trong một chế độ xã hội nhất định","Tổng thể các chế độ xã hội trong lịch sử và mối quan hệ giữa chúng","Tổng thể các giai cấp, tầng lớp trong một chế độ xã hội nhất định","Những cộng đồng người cùng toàn bộ những mối quan hệ xã hội do sự tác động lẫn nhau của các cộng đồng ấy tạo nên"],3,5],
  [122,"Cơ cấu xã hội - giai cấp là",["Cơ thể các cộng đồng người trong một chế độ xã hội nhất định","Tổng thể các tổ chức chính trị - xã hội trong một chế độ xã hội nhất định","Tổng thể các giai cấp, tầng lớp trong một chế độ xã hội nhất định, cùng với mối quan hệ giữa họ","Tổng thể các lực lượng lao động trong một chế độ xã hội nhất định"],2,5],
  [123,"Cơ cấu xã hội - giai cấp có vị trí như thế nào trong tổng thể cơ cấu xã hội?",["Vị trí ngang hàng","Vị trí độc lập","Vị trí trung tâm","Vị trí đối kháng"],2,5],
  [124,"Dưới góc độ chính trị - xã hội, loại hình cơ cấu xã hội nào đóng vai trò quyết định?",["Cơ cấu xã hội - tôn giáo","Cơ cấu xã hội - giai cấp","Cơ cấu xã hội - dân tộc","Cơ cấu xã hội - dân số"],1,5],
  [125,"Chủ nghĩa xã hội khoa học nghiên cứu cơ cấu xã hội nào?",["Cơ cấu xã hội - giai cấp","Cơ cấu xã hội - dân cư","Cơ cấu xã hội - nghề nghiệp","Cơ cấu xã hội - dân tộc"],0,5],
  [126,"Để thực hiện sứ mệnh lịch sử, giai cấp công nhân trước hết phải liên minh với lực lượng xã hội nào?",["Tầng lớp trí thức","Giai cấp nông dân","Tầng lớp tiểu tư sản","Giai cấp tư sản"],1,5],
  [127,"Trong nền kinh tế cơ cấu ngành Công nghiệp - Dịch vụ - Nông nghiệp, giai cấp nào đóng vai trò chủ yếu?",["Giai cấp tư sản","Giai cấp công nhân","Giai cấp nông dân","Tầng lớp doanh nhân"],1,5],
  [128,"Trong nền kinh tế cơ cấu ngành Nông nghiệp - Công nghiệp - Dịch vụ, giai cấp nào đóng vai trò chủ yếu?",["Giai cấp tư sản","Giai cấp công nhân","Giai cấp nông dân","Tầng lớp trí thức"],2,5],
  [129,"Yếu tố nào là tiêu chí cơ bản phân định giai cấp của một tập đoàn trong xã hội nhất định?",["Vị thế trong đảng phái chính trị","Quyền sở hữu về tư liệu sản xuất","Vai trò trong tổ chức lao động xã hội","Mức độ thu nhập sản phẩm lao động"],1,5],
  [130,"Cơ cấu xã hội nào là yếu tố cơ bản để đánh giá trình độ phát triển lực lượng sản xuất?",["Cơ cấu xã hội - dân cư","Cơ cấu xã hội - giai cấp","Cơ cấu xã hội - dân tộc","Cơ cấu xã hội - tôn giáo"],1,5],
  [131,"Cơ cấu xã hội nào là yếu tố cơ bản để đánh giá tính đa dạng văn hoá của một xã hội?",["Cơ cấu xã hội - nhân khẩu","Cơ cấu xã hội - giai cấp","Cơ cấu xã hội - dân tộc","Cơ cấu xã hội - nghề nghiệp"],2,5],
  [132,"Cơ cấu xã hội nào là căn cứ cơ bản để xây dựng chính sách phát triển kinh tế - văn hoá - xã hội?",["Cơ cấu xã hội - dân số","Cơ cấu xã hội - dân tộc","Cơ cấu xã hội - tôn giáo","Cơ cấu xã hội - giai cấp"],3,5],
  [133,"Điền vào chỗ chấm: 'Đấu tranh giai cấp và liên minh giai cấp là … của quan hệ giai cấp trong xã hội có giai cấp'",["Hai giai đoạn","Hai mặt","Kết quả","Mục tiêu"],1,5],
  [134,"Trong thời kì quá độ lên CNXH ở Việt Nam, cơ cấu xã hội - giai cấp gồm những thành phần nào?",["Giai cấp nông dân, địa chủ phong kiến, tầng lớp tiểu tư sản","Giai cấp tư sản, công nhân, tầng lớp trí thức, phụ nữ, thanh niên","Tầng lớp tiểu tư sản, giai cấp tư sản, công nhân, đội ngũ doanh nhân","Giai cấp công nhân, nông dân, đội ngũ trí thức, doanh nhân"],3,5],
  [135,"Mục đích của liên minh và đấu tranh giữa các giai cấp trong thời kì quá độ lên CNXH là",["Loại trừ nhau","Hoà hợp với nhau","Xích lại gần nhau","Thoả hiệp với nhau"],2,5],
  [136,"Trong thời kì quá độ lên CNXH, liên minh giai cấp trong lĩnh vực nào giữ vai trò quyết định?",["Tư tưởng","Chính trị","Văn hoá","Kinh tế"],3,5],
  [137,"Giai cấp công nhân Việt Nam trở thành lực lượng chính trị độc lập, giữ vai trò lãnh đạo cách mạng vì họ",["Có 'mối liên hệ tự nhiên' với giai cấp nông dân","Được kế thừa truyền thống bất khuất của dân tộc","Có số lượng đông và luôn đi đầu trong các cuộc đấu tranh","Thành lập được chính đảng cách mạng"],3,5],
  [138,"Giai cấp công nhân Việt Nam có 'mối liên hệ tự nhiên' với đông đảo nhân dân lao động vì",["Sống chung trong một đất nước","Có chung truyền thống văn hoá","Đa số xuất thân từ nông dân","Có chung hệ tư tưởng"],2,5],
  [139,"Yếu tố quyết định liên minh giữa công nhân, nông dân và các tầng lớp lao động khác là",["Cùng sống trong một quốc gia dân tộc","Có những lợi ích cơ bản thống nhất","Có chung nền văn hoá, tâm lí","Có chung hệ tư tưởng"],1,5],
  [140,"Trong hệ thống chính sách, chính sách nào cần được đặt lên vị trí hàng đầu?",["Chính trị","Kinh tế","Văn hoá","Tư tưởng"],1,5],
  [141,"Lực lượng xã hội nào có vai trò đặc biệt trong nâng cao sức cạnh tranh, bảo đảm độc lập, tự chủ của nền kinh tế?",["Giai cấp công nhân","Đội ngũ trí thức","Giai cấp nông dân","Đội ngũ doanh nhân"],3,5],
  [142,"Lực lượng xã hội nào có vai trò đặc biệt quan trọng trong xây dựng nền văn hoá tiên tiến và phát triển kinh tế tri thức?",["Giai cấp công nhân","Đội ngũ trí thức","Đội ngũ thanh niên","Đội ngũ doanh nhân"],1,5],
  [143,"Tầng lớp nào được coi là 'rường cột' của nước nhà, chủ nhân tương lai của đất nước?",["Trí thức","Doanh nhân","Phụ nữ","Thanh niên"],3,5],
  [144,"Trong thời kì quá độ lên CNXH ở Việt Nam hiện nay, giai cấp nào có vai trò quyết định tiến trình cách mạng?",["Giai cấp nông dân","Giai cấp công nhân","Đội ngũ trí thức","Đội ngũ doanh nhân"],1,5],
  [145,"Chính sách xã hội liên quan đến yếu tố nào cần được đặt lên vị trí hàng đầu?",["Cơ cấu xã hội - dân số","Cơ cấu xã hội - tôn giáo","Cơ cấu xã hội - giai cấp","Cơ cấu xã hội - dân tộc"],2,5],
  [146,"Nội dung kinh tế quan trọng nhất của liên minh giai cấp ở nước ta hiện nay là",["Mở rộng hợp tác quốc tế","Công nghiệp hoá, hiện đại hoá đất nước","Thực hiện xoá đói giảm nghèo","Nâng cao chất lượng đời sống nhân dân"],1,5],
  [147,"Nội dung văn hoá - xã hội quan trọng nhất của liên minh giai cấp ở nước ta hiện nay là",["Nâng cao chất lượng sống cho nhân dân","Thực hiện xoá đói giảm nghèo","Gắn tăng trưởng kinh tế với tiến bộ xã hội","Thực hiện tốt các chính sách xã hội"],2,5],
  [148,"Liên minh giữa GCCN với GCND và đội ngũ trí thức ở Việt Nam có thuận lợi là do",["Giai cấp công nhân có số lượng đông","Họ cùng có lợi ích chung","Người nông dân có bản tính chân thật","Đội ngũ trí thức không có hệ tư tưởng riêng"],1,5],
  [149,"Sau đổi mới, ở Việt Nam xuất hiện giai cấp, tầng lớp mới nào?",["Đội ngũ trí thức","Giai cấp công nhân","Đội ngũ doanh nhân","Giai cấp tư sản"],2,5],
  [150,"Từ năm 2004, Nhà nước ta lấy ngày 13/10 hằng năm để tôn vinh lực lượng nào?",["Trí thức","Phụ nữ","Doanh nhân","Thanh niên"],2,5],
  // CHƯƠNG 6: Dân tộc & Tôn giáo
  [201,"Theo từ Nguyên học, thuật ngữ 'dân chủ' được hiểu là gì?",["Quyền lực thuộc về nhân dân","Quyền của con người","Quyền tự do của mỗi người","Là một trật tự xã hội"],0,6],
  [202,"Theo CN Mác-Lênin, xét về phương diện chế độ xã hội và chính trị, dân chủ được hiểu là gì?",["Quyền lực thuộc về nhân dân","Là một nguyên tắc tổ chức, quản lý xã hội","Là một hình thức nhà nước","Quyền lực thuộc về tất cả mọi người"],2,6],
  [203,"Theo CN Mác-Lênin, xét về phương diện tổ chức, quản lý xã hội, dân chủ được hiểu là gì?",["Nhân dân là chủ nhân của nhà nước","Một nguyên tắc tổ chức, quản lý xã hội","Một hình thức tồn tại nhà nước","Quyền lực thuộc về tất cả mọi người"],1,6],
  [204,"Theo tư tưởng Hồ Chí Minh, dưới góc độ là một giá trị xã hội và mang tính nhân loại, dân chủ được hiểu là gì?",["Thực thi công bằng trong xã hội","Một nguyên tắc tổ chức, quản lý xã hội","Dân là chủ và dân làm chủ","Quyền lực thuộc về tất cả mọi người"],2,6],
  [205,"Trong xã hội công xã nguyên thuỷ, dân chủ của nhân dân thuộc về hình thức nào sau đây?",["Dân chủ trực tiếp","Dân chủ gián tiếp","Dân chủ hỗn hợp","Dân chủ tập trung"],0,6],
  [206,"Khi nghiên cứu lịch sử, Ph. Ăngghen gọi dân chủ trong xã hội nguyên thuỷ là gì?",["Dân chủ đại diện","Dân chủ tập trung","Dân chủ quân sự","Dân chủ dân sự"],2,6],
  [207,"Nền dân chủ XHCN được phôi thai từ cuộc cách mạng nào?",["Công xã Pari 1871","Cách mạng Tháng Mười Nga 1917","Cách mạng dân tộc dân chủ Trung Quốc 1949","Cách mạng Tháng Tám 1945"],0,6],
  [208,"Chế độ dân chủ nhân dân ở nước ta được xác lập từ khi nào?",["Sau Cách mạng tháng Tám 1945","Sau năm 1954","Sau 30/4/1975","Sau Đại hội đổi mới 1986"],0,6],
  [209,"Theo quan niệm chung, yếu tố nào sau đây có ý nghĩa quan trọng nhất trong việc thực thi nhà nước pháp quyền?",["Đề cao phúc lợi xã hội","Tôn trọng tự do cá nhân","Phát huy quyền bình đẳng","Thượng tôn pháp luật"],3,6],
  [210,"Ở Việt Nam hiện nay, chức năng cơ bản nhất của Mặt trận Tổ quốc là gì?",["Cứu trợ nhân đạo","Phản biện xã hội","Kiểm soát nhà nước","Đoàn kết dân tộc"],3,6],
  [211,"Toàn cầu hóa làm xuất hiện khái niệm biên giới 'mềm', yếu tố nào quan trọng nhất để phân định ranh giới giữa các quốc gia dân tộc?",["Kinh tế","Văn hóa","Ngôn ngữ","Tôn giáo"],1,6],
  [212,"Trong thời đại hiện nay, các dân tộc liên hiệp với nhau nhằm mục đích gì?",["Xóa bỏ sự khác biệt giữa các dân tộc","Phát triển dân tộc và giải quyết các vấn đề toàn cầu","Chống phân biệt chủng tộc","Chống chủ nghĩa bá quyền nước lớn"],1,6],
  [213,"Cương lĩnh dân tộc của CN Mác-Lênin đã trở thành ... cho chính sách dân tộc của Đảng Cộng sản",["Động lực","Cơ sở lý luận","Cơ sở thực tiễn","Bài học quan trọng"],1,6],
  [214,"Việc đảm bảo tỷ lệ thích hợp người dân tộc thiểu số trong các cơ quan quyền lực nhà nước là thể hiện?",["Quyền bình đẳng giữa các dân tộc","Quyền bình đẳng giữa các công dân","Quyền bình đẳng giữa các vùng miền","Quyền bình đẳng giữa các giai tầng"],0,6],
  [215,"Theo Chủ nghĩa Mác-Lênin, tôn giáo là một...?",["Hình thức hoạt động chính trị","Hình thái nghệ thuật phổ biến","Hình thái tâm lý cá nhân","Hình thái ý thức xã hội"],3,6],
  [216,"Sự khác biệt căn bản giữa tôn giáo và mê tín dị đoan thể hiện ở điểm nào sau đây?",["Đối tượng sùng bái","Nghi thức thờ cúng","Bản chất niềm tin","Không gian thờ cúng"],2,6],
  [217,"Theo Ban Tôn giáo Chính phủ, tính đến tháng 12/2020 Việt Nam có bao nhiêu tôn giáo được công nhận tư cách pháp nhân?",["Mười ba","Mười lăm","Mười sáu","Hai mươi"],2,6],
  [218,"Chủ trương đoàn kết những người có tín ngưỡng và không có tín ngưỡng của Đảng CSVN nhằm mục đích gì?",["Xây dựng khối đại đoàn kết dân tộc","Tạo điều kiện cho các tôn giáo phát triển","Xoá bỏ dần các tôn giáo","Thực hiện đoàn kết các tôn giáo"],0,6],
  [219,"Theo quan điểm của Đảng CSVN, giải quyết tốt mối quan hệ dân tộc và tôn giáo phải thực hiện yêu cầu nào?",["Nghiêm trị những hoạt động phá hoại khối đại đoàn kết dân tộc","Tạo điều kiện cho các tôn giáo phát triển","Thừa nhận các tôn giáo mới","Hạn chế sự phát triển của tôn giáo"],0,6],
  // Câu đặc biệt
  [151,"Yêu anh Đan không?",["còn lâu","ko quen","bạn thôi","Có hết lòng"],0,99],
  [152,"Anh nào đẹp trai nhất?",["Sơn Tùng","Jungkook","Anh Đan","Soobin"],2,99],
  [153,"Nhớ anh nhiều không?",["Nhớ chút chút","Nhớ sương sương","Nhớ bình thường","24/7 đều nhớ"],3,99],
  [154,"Khi gặp, thơm anh Đan bao nhiêu cái?",["1 cái","10 cái","100 cái","111 cái"],3,99],
]


const CHAPTERS: Record<number, string> = {
  2: "Chương 2: Sứ mệnh lịch sử GCCN",
  3: "Chương 3: CNXH & Thời kì quá độ",
  4: "Chương 4: Dân chủ XHCN & Nhà nước XHCN",
  5: "Chương 5: Cơ cấu xã hội - Giai cấp",
  6: "Chương 6: Dân tộc & Tôn giáo",
  99: "💕 Câu hỏi đặc biệt",
}

const LABELS = ["A", "B", "C", "D"]

type Question = {
  n: number
  q: string
  o: string[]
  a: number
  ch: number
}

type Result = {
  n: number
  q: string
  opts: string[]
  a: number
  sel: number
  ok: boolean
  ch: number
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function QuizApp() {
  const [screen, setScreen] = useState<"home" | "quiz" | "result">("home")
  const [chapter, setChapter] = useState(0)
  const [shuffleQ, setShuffleQ] = useState(true)
  const [shuffleA, setShuffleA] = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [results, setResults] = useState<Result[]>([])
  const [resultTab, setResultTab] = useState<"wrong" | "all">("wrong")

  const buildQuestions = useCallback(() => {
    let pool: Question[] = RAW.map((r) => ({
      n: r[0] as number,
      q: r[1] as string,
      o: r[2] as string[],
      a: r[3] as number,
      ch: r[4] as number,
    }))

    if (chapter) {
      pool = pool.filter((q) => q.ch === chapter)
    }

    if (shuffleQ) {
      pool = shuffle(pool)
    }

    return pool.map((q) => {
      if (shuffleA) {
        const paired = q.o.map((opt, i) => ({ opt, correct: i === q.a }))
        const shuffled = shuffle(paired)
        return {
          ...q,
          o: shuffled.map((p) => p.opt),
          a: shuffled.findIndex((p) => p.correct),
        }
      }
      return q
    })
  }, [chapter, shuffleQ, shuffleA])

  const startQuiz = () => {
    const qs = buildQuestions()
    setQuestions(qs)
    setIdx(0)
    setSelected(null)
    setAnswered(false)
    setResults([])
    setResultTab("wrong")
    setScreen("quiz")
  }

  const handleSelect = (optIdx: number) => {
    if (answered) return
    setSelected(optIdx)
    setAnswered(true)
    const q = questions[idx]
    setResults((prev) => [
      ...prev,
      {
        n: q.n,
        q: q.q,
        opts: q.o,
        a: q.a,
        sel: optIdx,
        ok: optIdx === q.a,
        ch: q.ch,
      },
    ])
  }

  const handleNext = () => {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setScreen("result")
    }
  }

  const handleBack = () => {
    if (idx > 0) {
      setIdx(idx - 1)
      const prevResult = results[idx - 1]
      if (prevResult) {
        setSelected(prevResult.sel)
        setAnswered(true)
      }
    }
  }

  const goHome = () => {
    setScreen("home")
    setResults([])
  }

  const retry = () => {
    startQuiz()
  }

  // Home Screen
  if (screen === "home") {
    return (
        <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center p-4">
        <Card className="max-w-[680px] w-full rounded-[20px] shadow-lg border-0">
        <CardContent className="p-8">
        <h1 className="text-2xl font-bold text-center text-foreground mb-1">
            Quiz CNXHKH
    </h1>
    <p className="text-center text-muted-foreground text-sm mb-7">
        Chu nghia Xa hoi Khoa hoc
    </p>

    <div className="grid grid-cols-3 gap-3 mb-7">
    <div className="bg-[#f5f7ff] rounded-xl p-4 text-center">
    <div className="text-2xl font-bold text-[#4f46e5]">120</div>
        <div className="text-xs text-muted-foreground mt-1">Cau hoi</div>
    </div>
    <div className="bg-[#f5f7ff] rounded-xl p-4 text-center">
    <div className="text-2xl font-bold text-[#4f46e5]">4</div>
        <div className="text-xs text-muted-foreground mt-1">Chuong</div>
        </div>
        <div className="bg-[#f5f7ff] rounded-xl p-4 text-center">
    <div className="text-2xl font-bold text-[#4f46e5]">100%</div>
        <div className="text-xs text-muted-foreground mt-1">Co dap an</div>
    </div>
    </div>

    <div className="text-sm font-semibold text-foreground mb-3">
        Chon chuong (hoac hoc tat ca)
    </div>
    <div className="grid grid-cols-2 gap-2.5 mb-5">
    <button
        onClick={() => setChapter(0)}
    className={cn(
      "p-3.5 border-2 rounded-xl text-center text-sm font-medium transition-all",
      chapter === 0
        ? "border-[#4f46e5] bg-[#f0f0ff] text-[#4f46e5]"
        : "border-[#e8eaff] bg-white text-foreground hover:border-[#4f46e5] hover:bg-[#f0f0ff] hover:text-[#4f46e5]"
  )}
  >
    <span className="text-xl block mb-1">&#9733;</span>
    Tat ca chuong
    </button>
    {Object.entries(CHAPTERS).map(([k, v]) => (
        <button
            key={k}
      onClick={() => setChapter(parseInt(k))}
      className={cn(
        "p-3.5 border-2 rounded-xl text-center text-sm font-medium transition-all",
        chapter === parseInt(k)
          ? "border-[#4f46e5] bg-[#f0f0ff] text-[#4f46e5]"
          : "border-[#e8eaff] bg-white text-foreground hover:border-[#4f46e5] hover:bg-[#f0f0ff] hover:text-[#4f46e5]"
    )}
    >
      <span className="text-xl block mb-1">&#128214;</span>
      {v.split(":")[0]}
      </button>
    ))}
    </div>

    <div className="flex gap-4 mb-5">
    <label className="flex items-center gap-2 text-sm cursor-pointer text-muted-foreground">
    <Checkbox
        checked={shuffleQ}
    onCheckedChange={(checked) => setShuffleQ(checked as boolean)}
    className="data-[state=checked]:bg-[#4f46e5] data-[state=checked]:border-[#4f46e5]"
        />
        Xao tron cau hoi
    </label>
    <label className="flex items-center gap-2 text-sm cursor-pointer text-muted-foreground">
    <Checkbox
        checked={shuffleA}
    onCheckedChange={(checked) => setShuffleA(checked as boolean)}
    className="data-[state=checked]:bg-[#4f46e5] data-[state=checked]:border-[#4f46e5]"
        />
        Xao tron dap an
    </label>
    </div>

    <Button
    onClick={startQuiz}
    className="w-full py-6 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold rounded-xl text-base"
        >
        Bat dau lam bai →
            </Button>
            </CardContent>
            </Card>
            </div>
  )
  }

  // Quiz Screen
  if (screen === "quiz") {
    const q = questions[idx]
    const total = questions.length
    const pct = Math.round((idx / total) * 100)

    return (
        <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center p-4">
        <Card className="max-w-[680px] w-full rounded-[20px] shadow-lg border-0">
        <CardContent className="p-8">
        <div className="bg-[#e8eaff] rounded-full h-1.5 mb-5 overflow-hidden">
        <div
            className="h-full bg-[#4f46e5] rounded-full transition-all duration-300"
    style={{ width: `${pct}%` }}
    />
    </div>

    <div className="flex justify-between items-center mb-4">
    <span className="text-sm text-muted-foreground">
        Cau {idx + 1}/{total} (Cau {q.n})
    </span>
    <span className="text-xs bg-[#f0f0ff] text-[#4f46e5] px-2.5 py-1 rounded-full font-medium">
        {CHAPTERS[q.ch]?.split(":")[0] || ""}
        </span>
        </div>

        <div className="text-base font-semibold text-foreground leading-relaxed mb-5">
        {q.q}
        </div>

        <div className="flex flex-col gap-2.5">
        {q.o.map((opt, i) => {
            let btnClass =
                "p-3.5 border-2 rounded-xl text-left text-sm flex items-center gap-2.5 transition-all"
            let labelClass =
                "w-6 h-6 rounded-full bg-[#f0f0ff] flex items-center justify-center font-bold text-xs text-[#4f46e5] shrink-0"

            if (answered) {
              if (i === q.a) {
                btnClass += " border-[#16a34a] bg-[#f0fdf4]"
                labelClass =
                    "w-6 h-6 rounded-full bg-[#16a34a] flex items-center justify-center font-bold text-xs text-white shrink-0"
              } else if (i === selected) {
                btnClass += " border-[#dc2626] bg-[#fff1f1]"
                labelClass =
                    "w-6 h-6 rounded-full bg-[#dc2626] flex items-center justify-center font-bold text-xs text-white shrink-0"
              } else {
                btnClass += " border-[#e8eaff] bg-white text-foreground"
              }
            } else {
              btnClass +=
                  " border-[#e8eaff] bg-white text-foreground hover:border-[#4f46e5] hover:bg-[#f5f5ff] cursor-pointer"
            }

            return (
                <button
                    key={i}
            onClick={() => handleSelect(i)}
            disabled={answered}
            className={btnClass}
            >
            <span className={labelClass}>{LABELS[i]}</span>
            {opt}
            </button>
          )
          })}
        </div>

    {answered && (
        <div
            className={cn(
          "mt-4 p-3 rounded-lg text-sm font-medium",
          selected === q.a
            ? "bg-[#f0fdf4] text-[#16a34a]"
            : "bg-[#fff1f1] text-[#dc2626]"
    )}
    >
      {selected === q.a
          ? "Chinh xac!"
          : `Sai roi! Dap an dung: ${LABELS[q.a]}. ${q.o[q.a]}`}
      </div>
    )}

    <div className="flex justify-between mt-5 gap-2.5">
    {idx > 0 ? (
            <Button
                onClick={handleBack}
        variant="outline"
    className="px-7 py-3 border-2 border-[#4f46e5] text-[#4f46e5] hover:bg-[#f0f0ff] font-semibold rounded-lg"
        >
                  ← Cau truoc
    </Button>
  ) : (
        <span />
    )}
    {answered ? (
            <Button
                onClick={handleNext}
        className="px-7 py-3 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold rounded-lg"
            >
            {idx + 1 < total ? "Cau tiep theo →" : "Xem ket qua"}
            </Button>
    ) : (
        <span />
    )}
    </div>
    </CardContent>
    </Card>
    </div>
  )
  }

  // Result Screen
  const correct = results.filter((r) => r.ok).length
  const total = results.length
  const pct = Math.round((correct / total) * 100)
  const msg =
      pct >= 90
          ? "Xuat sac! Em hoc gioi lam!"
          : pct >= 70
              ? "Tot lam! Co gang them nhe!"
              : pct >= 50
                  ? "On them mot chut nua nhe!"
                  : "Can on tap nhieu hon nha!"

  // Chapter stats
  const chStats: Record<number, { ok: number; total: number }> = {}
  results.forEach((r) => {
    if (!chStats[r.ch]) chStats[r.ch] = { ok: 0, total: 0 }
    chStats[r.ch].total++
    if (r.ok) chStats[r.ch].ok++
  })

  const wrongResults = results.filter((r) => !r.ok)
  const displayResults = resultTab === "wrong" ? wrongResults : results

  return (
      <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center p-4">
      <Card className="max-w-[680px] w-full rounded-[20px] shadow-lg border-0">
      <CardContent className="p-8">
      <div className="text-center mb-7">
      <div className="w-[120px] h-[120px] rounded-full bg-[#4f46e5] flex flex-col items-center justify-center mx-auto mb-4">
      <div className="text-3xl font-bold text-white">{correct}</div>
          <div className="text-sm text-white/80">/ {total}</div>
      </div>
      <div className="text-xl font-bold text-foreground">{pct}%</div>
      <div className="text-sm text-muted-foreground mt-1">{msg}</div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-6">
  <div className="p-3.5 rounded-xl bg-[#f0fdf4] text-center">
  <div className="text-xl font-bold text-[#16a34a]">{correct}</div>
      <div className="text-xs text-muted-foreground mt-0.5">Cau dung</div>
  </div>
  <div className="p-3.5 rounded-xl bg-[#fff1f1] text-center">
  <div className="text-xl font-bold text-[#dc2626]">{total - correct}</div>
      <div className="text-xs text-muted-foreground mt-0.5">Cau sai</div>
  </div>
  </div>

  <div className="text-sm font-semibold text-foreground mb-3">
      Ket qua theo chuong:
      </div>
      <div className="mb-5">
      {Object.entries(chStats).map(([ch, s]) => {
          const p = Math.round((s.ok / s.total) * 100)
          const barClass =
              p >= 80 ? "bg-[#16a34a]" : p < 50 ? "bg-[#dc2626]" : "bg-[#4f46e5]"
          return (
              <div key={ch} className="mb-2.5">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>{CHAPTERS[parseInt(ch)] || `Chuong ${ch}`}</span>
              <span className="font-semibold">
              {s.ok}/{s.total} ({p}%)
          </span>
          </div>
          <div className="bg-[#e8eaff] rounded-full h-2 overflow-hidden">
          <div
              className={cn("h-full rounded-full transition-all", barClass)}
          style={{ width: `${p}%` }}
          />
          </div>
          </div>
        )
        })}
      </div>

      <div className="flex border-b-2 border-[#e8eaff] mb-4">
  <button
      onClick={() => setResultTab("wrong")}
  className={cn(
    "px-4 py-2 text-sm font-semibold border-b-2 -mb-0.5 transition-colors",
    resultTab === "wrong"
      ? "text-[#4f46e5] border-[#4f46e5]"
      : "text-muted-foreground border-transparent"
)}
>
  Cau sai ({wrongResults.length})
  </button>
  <button
  onClick={() => setResultTab("all")}
  className={cn(
    "px-4 py-2 text-sm font-semibold border-b-2 -mb-0.5 transition-colors",
    resultTab === "all"
      ? "text-[#4f46e5] border-[#4f46e5]"
      : "text-muted-foreground border-transparent"
)}
>
  Tat ca ({total})
  </button>
  </div>

  <div className="max-h-[300px] overflow-y-auto">
      {displayResults.length === 0 ? (
            <div className="text-center text-[#16a34a] font-semibold p-4">
                Hoan hao! Khong co cau nao sai!
            </div>
) : (
      displayResults.map((r, i) => (
          <div
              key={i}
  className={cn(
    "p-3 rounded-lg mb-2 text-sm border-l-[3px]",
    r.ok
        ? "bg-[#f0fdf4] border-l-[#16a34a]"
        : "bg-[#fff1f1] border-l-[#dc2626]"
)}
>
  <div className="font-semibold text-foreground mb-1.5">
      {i + 1}. Cau {r.n}: {r.q}
  </div>
  <div className="text-muted-foreground">
      Ban chon: <strong>{LABELS[r.sel]}</strong> — {r.opts[r.sel] || "?"}
  </div>
  {!r.ok && (
      <div className="text-[#16a34a]">
          Dap an dung: <strong>{LABELS[r.a]}</strong> — {r.opts[r.a]}
  </div>
  )}
  </div>
))
)}
  </div>

  <div className="flex gap-2.5 mt-5">
  <Button
      onClick={goHome}
  variant="outline"
  className="flex-1 py-3 border-2 border-[#4f46e5] text-[#4f46e5] hover:bg-[#f0f0ff] font-semibold rounded-lg"
      >
      Trang chu
  </Button>
  <Button
  onClick={retry}
  className="flex-1 py-3 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold rounded-lg"
      >
      Lam lai
  </Button>
  </div>
  </CardContent>
  </Card>
  </div>
)
}
