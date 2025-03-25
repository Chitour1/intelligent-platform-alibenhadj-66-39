
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, Headphones, ChevronDown, ChevronRight } from 'lucide-react';
import { recentMediaItems, fetchVideoDetails } from '../utils/youtubeUtils';
import { useSearchParams } from 'react-router-dom';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

// Timeline for the March 22, 2025 video
const videoTimelineMarch22 = [
  { 
    id: 1, 
    startTime: "00:00:00", 
    endTime: "00:05:36", 
    title: "الافتتاح والثناء على الجهاد في رمضان",
    description: "حديث عن فضائل العشر الأواخر من رمضان، وربطها بتاريخ الجهاد والغزوات في هذا الشهر"
  },
  { 
    id: 2, 
    startTime: "00:05:36", 
    endTime: "00:11:07", 
    title: "غياب حديث العلماء عن الجهاد رغم نازلة غزة",
    description: "انتقاد العلماء والدعاة لصمتهم وعدم تفسير فريضة الجهاد في ظل ما يحدث في غزة"
  },
  { 
    id: 3, 
    startTime: "00:11:07", 
    endTime: "00:14:27", 
    title: "المفاهيم المقلوبة وتشويه صورة المجاهدين",
    description: "قلب الحقائق من قبل الإعلام وتحويل المقاوم إلى \"إرهابي\""
  },
  { 
    id: 4, 
    startTime: "00:14:27", 
    endTime: "00:17:42", 
    title: "جرائم الاحتلال في غزة وصمت الأنظمة",
    description: "استعراض المجازر الصهيونية والصمت العربي والدولي المريب"
  },
  { 
    id: 5, 
    startTime: "00:17:42", 
    endTime: "00:19:53", 
    title: "تقاعس الحكام والجيوش العربية",
    description: "نقد لامتلاكهم الأسلحة دون استخدامها في القضايا المصيرية"
  },
  { 
    id: 6, 
    startTime: "00:19:53", 
    endTime: "00:21:02", 
    title: "نقد العمرة الحديثة وتبذير الأموال",
    description: "نقد من يسافرون للعُمرة بينما الأمة تُذبح، والمال يُصرف على الفسق بدل الجهاد"
  },
  { 
    id: 7, 
    startTime: "00:21:02", 
    endTime: "00:24:25", 
    title: "النكوص عن فريضة الجهاد وتزييف الإعلام",
    description: "تبيين كيف شوّه الإعلام فريضة الجهاد، وتحويل المظلوم إلى جانٍ"
  },
  { 
    id: 8, 
    startTime: "00:24:25", 
    endTime: "00:28:55", 
    title: "منع التظاهر في العالم الإسلامي وغياب الشوارع",
    description: "مقارنة بين خروج الشعوب الغربية نصرة لغزة وصمت شوارع العرب"
  },
  { 
    id: 9, 
    startTime: "00:28:55", 
    endTime: "00:32:04", 
    title: "ازدواجية المعايير وتفكك الأمة الإسلامية",
    description: "سقوط مفهوم الأمة الواحدة وحلول الوطنية الضيقة مكانها"
  },
  { 
    id: 10, 
    startTime: "00:32:04", 
    endTime: "00:33:14", 
    title: "خطر فقدان الشعور بالقضايا الكبرى",
    description: "فقدان التفاعل الشعبي حتى مع المجازر الكبرى"
  },
  { 
    id: 11, 
    startTime: "00:33:14", 
    endTime: "00:38:50", 
    title: "ازدواجية الخطاب الرسمي تجاه الجهاد",
    description: "لماذا يُدعى للجهاد في أفغانستان ويُحرَّم في فلسطين؟"
  },
  { 
    id: 12, 
    startTime: "00:38:50", 
    endTime: "00:41:05", 
    title: "لماذا لم يعد القرآن يحرك المسلمين؟",
    description: "التحذير من انفصال التلاوة عن العمل بالقرآن"
  },
  { 
    id: 13, 
    startTime: "00:41:05", 
    endTime: "00:47:34", 
    title: "إعلام التضليل وتحريف الكلم عن مواضعه",
    description: "هجوم على القنوات العربية التي تحرّف الدين وتُضلل الشعوب"
  },
  { 
    id: 14, 
    startTime: "00:47:34", 
    endTime: "00:48:39", 
    title: "دخول الغربيين في الإسلام ومعرفة الجاهلية",
    description: "كيف أن الجاهلية الحديثة دفعت بعض الغربيين إلى الإسلام"
  },
  { 
    id: 15, 
    startTime: "00:48:39", 
    endTime: "00:49:47", 
    title: "تشويه المقاومة الفلسطينية وازدراء حماس",
    description: "رفض للاتهامات الموجهة لحماس والمقاومة وتحذير من التبعية الإعلامية"
  },
  { 
    id: 16, 
    startTime: "00:49:47", 
    endTime: "00:50:57", 
    title: "دور فرنسا وأمريكا وبريطانيا في جرائم الاستعمار",
    description: "استدعاء للتاريخ الاستعماري للدول الغربية"
  },
  { 
    id: 17, 
    startTime: "00:50:57", 
    endTime: "00:54:14", 
    title: "فشل المنظومة التربوية ومعاناة التلاميذ",
    description: "نقد شديد لنظام التعليم في الجزائر"
  },
  { 
    id: 18, 
    startTime: "00:54:14", 
    endTime: "00:56:30", 
    title: "المواهب الطلابية وضرورة احترام التخصصات",
    description: "دعوة لإصلاح التعليم حسب ميولات الطلبة"
  },
  { 
    id: 19, 
    startTime: "00:56:30", 
    endTime: "00:59:41", 
    title: "هجرة العقول وغياب بيئة الابتكار",
    description: "الهجرة العلمية وقيمة الإنسان خارج بلده"
  },
  { 
    id: 20, 
    startTime: "00:59:41", 
    endTime: "01:01:45", 
    title: "مكانة اليمن ومواجهة الاستهزاء بضعف إمكاناتهم",
    description: "الدفاع عن فقراء المجاهدين في اليمن ورفض الاستهزاء بهم"
  },
  { 
    id: 21, 
    startTime: "01:01:45", 
    endTime: "01:06:03", 
    title: "سوء فهم القرآن والانفصال بين التلاوة والعمل",
    description: "الدعوة إلى اتباع الأحكام لا مجرد التلاوة"
  },
  { 
    id: 22, 
    startTime: "01:06:03", 
    endTime: "01:10:18", 
    title: "الاقتصار على الدعاء في زمن الجهاد",
    description: "تشبيه الاكتفاء بالدعاء بالعاجز عن الدفاع عن بيته"
  },
  { 
    id: 23, 
    startTime: "01:10:18", 
    endTime: "01:13:46", 
    title: "خذلان الحكام وصمت الجزائر تجاه جنوب أفريقيا",
    description: "تجاهل موقف جنوب إفريقيا رغم شجاعتها القانونية"
  },
  { 
    id: 24, 
    startTime: "01:13:46", 
    endTime: "01:18:05", 
    title: "دعوة لتجميد الخلافات المذهبية والانتباه للفخاخ",
    description: "الحذر من التفرقة السنية الشيعية في ظل حرب الوجود"
  },
  { 
    id: 25, 
    startTime: "01:18:05", 
    endTime: "01:23:20", 
    title: "التلاعب بالتاريخ في الإعلام والدراما",
    description: "نقد لمسلسل معاوية كمثال على تأجيج الخلافات التاريخية"
  },
  { 
    id: 26, 
    startTime: "01:23:20", 
    endTime: "01:24:23", 
    title: "رفض سب الصحابة والدعوة لفقه الخلاف",
    description: "الدعوة للتمييز بين نقد الأفعال وسب الصحابة"
  },
  { 
    id: 27, 
    startTime: "01:24:23", 
    endTime: "01:25:25", 
    title: "دعم الحوثيين دفاعًا عن القضية المركزية",
    description: "دفاع عن من يناصرون غزة مهما اختلفت مشاربهم"
  },
  { 
    id: 28, 
    startTime: "01:25:25", 
    endTime: "01:26:31", 
    title: "واجب العلماء في تحريك الشعوب",
    description: "حثّ العلماء على القيام بدورهم في تحريك الرأي العام"
  },
  { 
    id: 29, 
    startTime: "01:26:31", 
    endTime: "01:37:42", 
    title: "قصة الإمام الذي واجه الأمير بآية قرآنية",
    description: "قصة رمزية عن استخدام القرآن للرد على الاستبداد"
  },
  { 
    id: 30, 
    startTime: "01:37:42", 
    endTime: "01:49:26", 
    title: "استغلال السلطة لتقييد الخطاب الديني",
    description: "نقد تسييس الدين وتقييد الأئمة والخطباء"
  },
  { 
    id: 31, 
    startTime: "01:49:26", 
    endTime: "01:56:38", 
    title: "فريضة الوقت هي نصرة غزة لا غير",
    description: "خلاصة الكلمة وتأكيد على أن القضية الفلسطينية هي القضية المركزية الآن"
  },
  { 
    id: 32, 
    startTime: "01:56:38", 
    endTime: "02:06:05", 
    title: "نقد البوتفليقية واستمراريتها في الحكم",
    description: "هجوم مباشر على النظام السياسي الجزائري واستمرارية عقلية بوتفليقة"
  },
  { 
    id: 33, 
    startTime: "02:06:05", 
    endTime: "02:15:49", 
    title: "حق لاجئي غزة في دخول أرض الإسلام",
    description: "رفض وصف اللاجئين من غزة بالمهجّرين والدعوة لاحتضانهم"
  },
  { 
    id: 34, 
    startTime: "02:15:49", 
    endTime: "02:26:21", 
    title: "الدولة تُقصي تيارات وتفضل أخرى باسم التعددية",
    description: "نقد التمييز بين الزوايا والتيارات الإسلامية"
  },
  { 
    id: 35, 
    startTime: "02:26:21", 
    endTime: "02:35:00", 
    title: "محاكمة سعيد بوتفليقة ومحاسبة رموز النظام السابق",
    description: "دعوة إلى المحاسبة العلنية العادلة لرموز النظام السابق بدون استثناء"
  },
];

// Timeline for the March 23, 2025 video
const videoTimelineMarch23 = [
  { 
    id: 1, 
    startTime: "00:06", 
    endTime: "01:12", 
    title: "مقدمة الدعاء والتحميد والترحم على الشهداء والمرضى والمظلومين",
    description: "افتتاح الكلمة بالدعاء والتحميد والترحم على الشهداء والمرضى والمظلومين"
  },
  { 
    id: 2, 
    startTime: "01:12", 
    endTime: "02:15", 
    title: "فضل الرحمة والعطف في شهر رمضان والتكافل",
    description: "الحديث عن فضل الرحمة والعطف في شهر رمضان والتكافل الاجتماعي"
  },
  { 
    id: 3, 
    startTime: "02:15", 
    endTime: "03:22", 
    title: "الصمت في الإسلام وأثره في حياة الصحابة",
    description: "شرح مفهوم الصمت في الإسلام ودوره في حياة الصحابة"
  },
  { 
    id: 4, 
    startTime: "03:22", 
    endTime: "06:41", 
    title: "الصمت والكلام الواجب، وأهمية اجتناب اللغو والجدال",
    description: "التفريق بين الصمت المحمود والكلام الواجب، وأهمية اجتناب اللغو والجدال"
  },
  { 
    id: 5, 
    startTime: "06:41", 
    endTime: "13:26", 
    title: "عدد أحاديث النبي وسلوك الصحابة، وفضل الصمت، وكتاب \"الصمت\"",
    description: "الحديث عن عدد أحاديث النبي وسلوك الصحابة، وفضل الصمت، ومراجعة كتاب الصمت"
  },
  { 
    id: 6, 
    startTime: "13:26", 
    endTime: "16:43", 
    title: "واجب العلماء في متابعة الحكام ونصحهم، وعدم عزل الحاكم عن الشعب",
    description: "شرح واجب العلماء في متابعة الحكام ونصحهم، وخطورة عزل الحاكم عن الشعب"
  },
  { 
    id: 7, 
    startTime: "16:43", 
    endTime: "23:20", 
    title: "صعوبة لقاء المسؤولين، احتجاب الحكام، مقارنة بالغرب، ضعف المؤسسات",
    description: "نقد صعوبة لقاء المسؤولين واحتجاب الحكام مقارنة بالدول الغربية، وضعف المؤسسات"
  },
  { 
    id: 8, 
    startTime: "23:20", 
    endTime: "26:47", 
    title: "أولى عرى الإسلام نقض الحكم، الحاكم يجب أن يحكم بكتاب الله",
    description: "شرح أن أولى عرى الإسلام التي تنقض هي الحكم، والتأكيد على أن الحاكم يجب أن يحكم بكتاب الله"
  },
  { 
    id: 9, 
    startTime: "26:47", 
    endTime: "29:03", 
    title: "توزيع المصاحف في ليلة 27 وعدم العمل بمضمونها",
    description: "انتقاد ظاهرة توزيع المصاحف في ليلة 27 من رمضان مع عدم العمل بمضمونها"
  },
  { 
    id: 10, 
    startTime: "29:03", 
    endTime: "32:20", 
    title: "كثرة القراء وقلة الفقهاء، انفصال القرآن عن السلطان",
    description: "الحديث عن ظاهرة كثرة القراء وقلة الفقهاء، وخطورة انفصال القرآن عن السلطان"
  },
  { 
    id: 11, 
    startTime: "32:20", 
    endTime: "35:45", 
    title: "دور العلماء في مخاطبة الحكام، وأهمية تطبيق الدين لا شكله",
    description: "شرح دور العلماء في مخاطبة الحكام، والتأكيد على أهمية تطبيق الدين لا الاكتفاء بشكله"
  },
  { 
    id: 12, 
    startTime: "35:45", 
    endTime: "39:05", 
    title: "مهاجمة الحكام لصمتهم تجاه المجازر، والاكتفاء بالشعارات والدعاية",
    description: "انتقاد الحكام لصمتهم تجاه المجازر، واكتفائهم بالشعارات والدعاية"
  },
  { 
    id: 13, 
    startTime: "39:05", 
    endTime: "41:17", 
    title: "ضعف التعليم الديني، مقارنة المواد الدنيوية بالدينية، دور الأسرة والمدرسة",
    description: "نقد ضعف التعليم الديني، ومقارنة المواد الدنيوية بالدينية، والتأكيد على دور الأسرة والمدرسة"
  },
  { 
    id: 14, 
    startTime: "41:17", 
    endTime: "46:26", 
    title: "معرفة عامة الناس بالأمور المعلومة من الدين بالضرورة",
    description: "الحديث عن مستوى معرفة عامة الناس بالأمور المعلومة من الدين بالضرورة"
  },
  { 
    id: 15, 
    startTime: "46:26", 
    endTime: "47:31", 
    title: "تهميش المتخرجين من الشريعة، والتضييق على المتدينين",
    description: "انتقاد تهميش المتخرجين من كليات الشريعة، والتضييق على المتدينين"
  },
  { 
    id: 16, 
    startTime: "47:31", 
    endTime: "50:24", 
    title: "التربية تبدأ من البيت والمدرسة، والانفصام بين القيم والإعلام",
    description: "التأكيد على أن التربية تبدأ من البيت والمدرسة، وانتقاد الانفصام بين القيم والإعلام"
  },
  { 
    id: 17, 
    startTime: "50:24", 
    endTime: "51:30", 
    title: "الانتقال إلى الرد على ندوة الرئيس تبون",
    description: "الانتقال في الموضوع إلى الرد على اللقاء الصحفي للرئيس تبون"
  },
  { 
    id: 18, 
    startTime: "51:30", 
    endTime: "53:45", 
    title: "التعددية السياسية لا تعني الإقصاء والتهميش",
    description: "شرح أن التعددية السياسية الحقيقية لا تعني الإقصاء والتهميش"
  },
  { 
    id: 19, 
    startTime: "53:45", 
    endTime: "56:02", 
    title: "تأسيس الأحزاب ينبغي أن يتم بالإخطار وليس الترخيص",
    description: "نقاش حول تأسيس الأحزاب وأنه ينبغي أن يتم بالإخطار وليس الترخيص"
  },
  { 
    id: 20, 
    startTime: "56:02", 
    endTime: "58:11", 
    title: "ملاحظات على اللقاء الصحفي لتبون، غياب الشفافية",
    description: "تقديم ملاحظات على اللقاء الصحفي للرئيس تبون، وانتقاد غياب الشفافية"
  },
  { 
    id: 21, 
    startTime: "58:11", 
    endTime: "59:18", 
    title: "انتقادات لطريقة طرح الأسئلة الصحفية",
    description: "توجيه انتقادات لطريقة طرح الأسئلة الصحفية في اللقاء"
  },
  { 
    id: 22, 
    startTime: "59:18", 
    endTime: "1:02:23", 
    title: "غياب حرية الصحافة، الإعلام موجه، غياب التعدد الإعلامي",
    description: "انتقاد غياب حرية الصحافة، والإشارة إلى أن الإعلام موجه، وغياب التعدد الإعلامي"
  },
  { 
    id: 23, 
    startTime: "1:02:23", 
    endTime: "1:06:26", 
    title: "سيطرة الدولة العميقة على مؤسسات الدولة",
    description: "الحديث عن سيطرة الدولة العميقة على مؤسسات الدولة وتأثيرها"
  },
  { 
    id: 24, 
    startTime: "1:06:26", 
    endTime: "1:09:22", 
    title: "استخدام اللغة الفرنسية في اللقاء وغياب العربية",
    description: "انتقاد استخدام اللغة الفرنسية في اللقاء الصحفي وغياب اللغة العربية"
  },
  { 
    id: 25, 
    startTime: "1:09:22", 
    endTime: "1:12:21", 
    title: "أزمة الهوية وتهميش اللغة الأمازيغية تاريخياً",
    description: "مناقشة أزمة الهوية وتهميش اللغة الأمازيغية عبر التاريخ"
  },
  { 
    id: 26, 
    startTime: "1:12:21", 
    endTime: "1:16:12", 
    title: "ازدواجية التعامل مع اللغات، تجاهل الدستور",
    description: "انتقاد ازدواجية التعامل مع اللغات وتجاهل الدستور"
  },
  { 
    id: 27, 
    startTime: "1:16:12", 
    endTime: "1:18:20", 
    title: "المشاكل الداخلية غير مطروحة في الخطاب",
    description: "الإشارة إلى أن المشاكل الداخلية غير مطروحة في الخطاب الرسمي"
  },
  { 
    id: 28, 
    startTime: "1:18:20", 
    endTime: "1:21:36", 
    title: "انتقاد السياسة الخارجية، خاصة تجاه فرنسا",
    description: "توجيه انتقادات للسياسة الخارجية، خاصة العلاقة مع فرنسا"
  },
  { 
    id: 29, 
    startTime: "1:21:36", 
    endTime: "1:27:46", 
    title: "استخدام العشرية السوداء لتبييض النظام الحالي، واستمرار القمع",
    description: "انتقاد استخدام أحداث العشرية السوداء لتبييض النظام الحالي، والإشارة إلى استمرار القمع"
  },
  { 
    id: 30, 
    startTime: "1:27:46", 
    endTime: "1:30:59", 
    title: "ضرورة محاسبة الرئيس على مخالفة الدستور باستخدام الفرنسية",
    description: "المطالبة بمحاسبة الرئيس على مخالفة الدستور باستخدامه اللغة الفرنسية"
  },
  { 
    id: 31, 
    startTime: "1:30:59", 
    endTime: "1:34:08", 
    title: "ضرورة التحرر من الدولة العميقة، وعدم الشفافية في الحكم",
    description: "التأكيد على ضرورة التحرر من الدولة العميقة، وانتقاد عدم الشفافية في الحكم"
  },
  { 
    id: 32, 
    startTime: "1:34:08", 
    endTime: "1:38:20", 
    title: "التلاعب بلغة الخطاب لإرضاء فرنسا، تغييب الصحافة الحقيقية",
    description: "انتقاد التلاعب بلغة الخطاب لإرضاء فرنسا، والإشارة إلى تغييب الصحافة الحقيقية"
  },
  { 
    id: 33, 
    startTime: "1:38:20", 
    endTime: "1:42:39", 
    title: "مهاجمة ماكرون وفضح ازدواجية العلاقات مع فرنسا",
    description: "مهاجمة الرئيس الفرنسي ماكرون وفضح ازدواجية العلاقات الرسمية مع فرنسا"
  },
  { 
    id: 34, 
    startTime: "1:42:39", 
    endTime: "1:46:45", 
    title: "الصمت عن أمريكا وإسرائيل، النفاق السياسي",
    description: "انتقاد الصمت الرسمي عن أمريكا وإسرائيل، والإشارة إلى النفاق السياسي"
  },
  { 
    id: 35, 
    startTime: "1:46:45", 
    endTime: "1:51:02", 
    title: "منع التظاهر وتكميم الأفواه، تسييس الخطاب الإعلامي",
    description: "انتقاد منع التظاهر وتكميم الأفواه، والإشارة إلى تسييس الخطاب الإعلامي"
  },
  { 
    id: 36, 
    startTime: "1:51:02", 
    endTime: "1:56:03", 
    title: "العدالة الانتقائية، التلاعب بالقضاء، تجارب الدول الأخرى",
    description: "الحديث عن العدالة الانتقائية والتلاعب بالقضاء، ومقارنة ذلك بتجارب الدول الأخرى"
  },
  { 
    id: 37, 
    startTime: "1:56:03", 
    endTime: "1:58:16", 
    title: "قصة عثمان النيسابوري ومراعاة مشاعر زوجته",
    description: "سرد قصة عثمان النيسابوري ومراعاته لمشاعر زوجته كمثال على الأخلاق الإسلامية"
  },
  { 
    id: 38, 
    startTime: "1:58:16", 
    endTime: "2:01:13", 
    title: "اختلال معايير الطلاق في المجتمع، تدهور العلاقات الأسرية",
    description: "الحديث عن اختلال معايير الطلاق في المجتمع وتدهور العلاقات الأسرية"
  },
  { 
    id: 39, 
    startTime: "2:01:13", 
    endTime: "2:02:23", 
    title: "تمجيد النظام للمتورطين في قضايا قديمة وتناسي الضحايا",
    description: "انتقاد تمجيد النظام للمتورطين في قضايا قديمة وتناسي الضحايا"
  },
  { 
    id: 40, 
    startTime: "2:02:23", 
    endTime: "2:05:00", 
    title: "دعوة للتوثيق الشخصي للانتهاكات، ونقد سياسات الصمت والتطبيع",
    description: "تقديم دعوة للتوثيق الشخصي للانتهاكات، وانتقاد سياسات الصمت والتطبيع"
  }
];

const FridayMeetingsVideo = () => {
  const [searchParams] = useSearchParams();
  const videoIdParam = searchParams.get('videoId');
  const { playAudio } = useAudioPlayer();
  
  // Filter only video items
  const videoItems = recentMediaItems.filter(item => item.type === 'video' && item.videoId);
  
  // Set currentVideo from URL param or use the first video in the list
  const [currentVideo, setCurrentVideo] = useState(videoIdParam || (videoItems.length > 0 ? videoItems[0].videoId : "XS7jF85h9TY"));
  
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    date: ""
  });
  
  const [timelineOpen, setTimelineOpen] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const loadVideoDetails = async () => {
      try {
        const details = await fetchVideoDetails(currentVideo);
        setVideoDetails({
          title: details.title,
          description: details.description || "لا يوجد وصف متاح.",
          date: details.publishedAt ? formatDate(details.publishedAt) : ""
        });
      } catch (error) {
        console.error("Error fetching video details:", error);
        setVideoDetails({
          title: "كلمة الشيخ علي بن حاج",
          description: "لقاء الجمعة الأسبوعي مع الشيخ علي بن حاج يناقش فيه أهم القضايا الراهنة والمستجدات السياسية والاجتماعية والدينية في الجزائر والعالم الإسلامي.",
          date: "٢٢ مارس ٢٠٢٥"
        });
      }
    };

    loadVideoDetails();
  }, [currentVideo]);

  // Convert time string to seconds
  const timeToSeconds = (timeStr: string) => {
    // Handle the new format "1:02:23"
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 0;
  };

  // Helper function to format date to Arabic format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = getArabicMonth(date.getMonth());
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Convert month number to Arabic month name
  const getArabicMonth = (monthIndex) => {
    const arabicMonths = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    return arabicMonths[monthIndex];
  };

  // Handle jumping to a specific time in the video
  const jumpToTime = (timeStr: string) => {
    const seconds = timeToSeconds(timeStr);
    if (iframeRef.current && iframeRef.current.src) {
      // Update the iframe src with the start time parameter
      const currentSrc = iframeRef.current.src;
      const baseUrl = currentSrc.split('?')[0];
      iframeRef.current.src = `${baseUrl}?start=${seconds}&autoplay=1`;
    }
  };

  // Determine which video is currently playing to show the appropriate timeline
  const getCurrentVideoTimeline = () => {
    // Check for March 22, 2025 video
    if (currentVideo === "XS7jF85h9TY") {
      return videoTimelineMarch22;
    }
    // Check for March 23, 2025 video
    else if (currentVideo === "57X7fzssUQY") {
      return videoTimelineMarch23;
    }
    // Default: return an empty array if no timeline is available
    return [];
  };

  // Check if the current video has a timeline
  const hasTimeline = () => {
    return getCurrentVideoTimeline().length > 0;
  };

  // وظيفة تشغيل الصوت فقط
  const playAudioOnly = () => {
    if (currentVideo) {
      // استخدام معرف الفيديو للحصول على رابط الصوت
      const audioSource = `https://youtubeaudio.lovabledev.com/api/audio/${currentVideo}`;
      
      // تشغيل الصوت في الخلفية
      playAudio({
        id: currentVideo,
        title: videoDetails.title,
        source: audioSource,
        thumbnail: `https://img.youtube.com/vi/${currentVideo}/mqdefault.jpg`
      });
      
      toast({
        title: "تم تشغيل الصوت",
        description: "جاري تشغيل الكلمة بدون فيديو، يمكنك الاستماع حتى مع تصفح الصفحات الأخرى",
      });
    }
  };

  return (
    <div className="section-container">
      <h1 className="section-title mb-8">لقاء الجمعة المرئي</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main video player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 bg-navy text-white hover:bg-navy-dark"
              onClick={playAudioOnly}
            >
              <Headphones size={16} />
              <span>استمع للكلمة (صوت فقط)</span>
            </Button>
          </div>
          
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <iframe 
              ref={iframeRef}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${currentVideo}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-navy-dark">{videoDetails.title}</h2>
            <p className="text-sm text-gray-500">{videoDetails.date}</p>
            <p className="text-gray-700 leading-relaxed font-droid-kufi">{videoDetails.description}</p>
          </div>

          {/* Video Timeline Section - Show only for videos with timeline */}
          {hasTimeline() && (
            <div className="mt-8 bg-gray-50 rounded-lg p-4">
              <div 
                className="flex items-center justify-between cursor-pointer" 
                onClick={() => setTimelineOpen(!timelineOpen)}
              >
                <h3 className="font-bold text-navy flex items-center gap-2">
                  <Clock size={18} />
                  فهرس محتويات الكلمة
                </h3>
                <Button variant="ghost" size="sm">
                  {timelineOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </Button>
              </div>
              
              {timelineOpen && (
                <div className="mt-4 space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {getCurrentVideoTimeline().map((section) => (
                    <div 
                      key={section.id}
                      className="p-2 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => jumpToTime(section.startTime)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold text-navy-dark">{section.title}</h4>
                        <span className="text-sm text-gold bg-gold/10 px-2 py-1 rounded font-mono">
                          {section.startTime} - {section.endTime}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-droid-kufi">{section.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Sidebar with video list */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-navy">اللقاءات السابقة</h3>
              <div className="flex space-x-2 space-x-reverse">
                <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                  <ArrowRight size={18} />
                </button>
                <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                  <ArrowLeft size={18} />
                </button>
              </div>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
              {videoItems.map((video, index) => (
                <VideoListItem 
                  key={index}
                  video={video} 
                  isActive={video.videoId === currentVideo}
                  onClick={() => setCurrentVideo(video.videoId)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Separate component for video list items
const VideoListItem = ({ video, onClick, isActive = false }) => {
  const [title, setTitle] = useState(video.title || "جاري تحميل العنوان...");

  useEffect(() => {
    const getVideoTitle = async () => {
      try {
        const details = await fetchVideoDetails(video.videoId);
        setTitle(details.title);
      } catch (error) {
        console.error(`Error fetching details for video ${video.videoId}:`, error);
        // Keep the existing title if provided, otherwise show error
        setTitle(video.title || "عنوان غير متاح");
      }
    };

    if (!video.title) {
      getVideoTitle();
    }
  }, [video.videoId, video.title]);

  return (
    <div 
      className={`flex gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${isActive ? 'bg-gray-100 border-r-4 border-gold' : ''}`}
      onClick={onClick}
    >
      <div className="flex-shrink-0 relative w-24 h-16 rounded overflow-hidden">
        <img 
          src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`font-medium text-sm ${isActive ? 'text-gold' : 'text-navy-dark'} line-clamp-2`}>{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{video.date}</p>
      </div>
    </div>
  );
};

export default FridayMeetingsVideo;
