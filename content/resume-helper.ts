import { LandingContent } from "@/content/types";

export const resumeHelperLanding: LandingContent = {
  slug: "resume-helper",
  name: "Resume Helper",
  status: "active",
  title: "Resume Helper | 이력서를 지원 포지션 기준으로 재구성하는 도우미",
  description:
    "이력서와 경력 기술서를 채용 공고에 맞게 재구성하는 AI 서비스 랜딩 예시입니다.",
  headline: "지원할 때마다 이력서를 다시 고치지 말고, 포지션에 맞는 버전을 빠르게 만드세요.",
  subheadline:
    "Resume Helper는 공고별 핵심 요구사항을 읽고, 당신의 경력에서 강조해야 할 경험을 우선순위로 정리해줍니다.",
  ctaLabel: "사전 등록하기",
  ctaSubtext: "커리어 실험용 두 번째 샘플 랜딩입니다.",
  heroHighlights: [
    {
      title: "Target",
      description: "채용 공고 기준으로 강조해야 할 경험을 재정렬합니다."
    },
    {
      title: "Rewrite",
      description: "문장톤과 성과지표를 더 설득력 있게 보정합니다."
    },
    {
      title: "Export",
      description: "PDF, 노션, 이메일 지원용 텍스트까지 바로 변환합니다."
    }
  ],
  problem: {
    eyebrow: "Problem",
    title: "지원할 때마다 같은 이력서를 반복 수정하게 됩니다.",
    description:
      "경력은 같은데 포지션마다 강조 포인트가 달라 반복 작업이 생기고, 설득력 없는 문장이 남습니다.",
    bullets: [
      "채용 공고와 내 경험을 매번 수동으로 매핑해야 합니다.",
      "성과가 분명한 경험도 문장 구조 때문에 약하게 보일 수 있습니다.",
      "여러 버전을 관리하다 보면 최신 이력서를 잃기 쉽습니다."
    ]
  },
  solution: {
    eyebrow: "Solution",
    title: "지원 포지션별로 이력서의 강조 구조를 자동으로 바꿉니다.",
    description:
      "사용자가 가진 경력 데이터는 유지하고, 메시지와 문장 우선순위만 공고에 맞춰 조정합니다.",
    bullets: [
      "JD에서 핵심 역량과 필수 조건을 읽어 우선순위를 정합니다.",
      "관련 프로젝트와 성과를 상단에 재배치합니다.",
      "결과 중심 문장으로 수정해 채용 담당자가 빠르게 이해할 수 있게 합니다.",
      "랜딩 실험 단계에서는 대기자 등록과 인터뷰 신청 흐름부터 먼저 검증할 수 있습니다."
    ]
  },
  benefits: [
    {
      title: "콘텐츠 기반 다중 랜딩",
      description:
        "AI 생산성, 커리어, B2B 등 주제가 달라도 공통 UI를 재사용해 구현 속도를 유지합니다."
    },
    {
      title: "서버 검증 기반 폼 처리",
      description:
        "Route Handler와 zod 검증으로 클라이언트 직접 insert 없이 데이터를 안전하게 받습니다."
    },
    {
      title: "확장 가능한 DB 구조",
      description:
        "landing_slug, utm, referrer를 함께 저장해 나중에 admin 화면과 자동화에 연결할 수 있습니다."
    },
    {
      title: "운영 친화적 thanks 흐름",
      description:
        "제출 이후 예약, 공유, 후속 자료 제공 같은 다음 액션을 바로 유도할 수 있습니다."
    }
  ],
  socialProof: [
    {
      label: "Waitlist",
      value: "218",
      caption: "가상의 대기자 등록 예시 수치"
    },
    {
      label: "Interview Rate",
      value: "34%",
      caption: "폼 제출 후 인터뷰 요청까지 이어진 비율"
    },
    {
      label: "Resume Variants",
      value: "5x faster",
      caption: "공고별 버전 생성 속도 개선"
    }
  ],
  faq: [
    {
      question: "랜딩마다 다른 폼 구조도 지원할 수 있나요?",
      answer:
        "지원할 수 있습니다. 현재 MVP는 공통 필드 중심이지만 content와 validation 스키마를 확장하면 됩니다."
    },
    {
      question: "Supabase가 아직 없어도 UI 개발은 가능한가요?",
      answer:
        "가능합니다. 다만 API 저장 경로는 환경변수가 없으면 503으로 응답하게 되어 있으므로 연결 전에는 제출 성공 흐름까지만 점검하면 됩니다."
    },
    {
      question: "나중에 admin 페이지도 붙일 수 있나요?",
      answer:
        "README 방향대로 `/admin`을 추가하면 되고, 현재 구조는 그 확장을 고려해 landing_slug와 UTM 필드를 함께 저장합니다."
    }
  ],
  form: {
    title: "오픈 베타 소식을 먼저 받아보세요",
    description:
      "초기 사용성 인터뷰, 베타 초대, 기능 업데이트 소식을 전달합니다.",
    submitLabel: "사전 등록",
    successMessage: "사전 등록이 완료되었습니다. 다음 배치 초대 전에 먼저 안내드리겠습니다."
  },
  finalCta: {
    title: "메시지 검증이 끝난 다음에야 제품과 도메인을 분리하면 됩니다.",
    description:
      "처음부터 독립 프로젝트를 여러 개 만드는 대신, 같은 운영 구조에서 전환 데이터를 먼저 쌓으세요.",
    ctaLabel: "폼으로 이동"
  }
};

