import { LandingContent } from "@/content/types";

export const aiNoteLanding: LandingContent = {
  slug: "ai-note",
  name: "AI Note",
  status: "active",
  title: "AI Note | 회의 내용을 제품 인사이트로 바꾸는 노트",
  description:
    "팀 인터뷰, 미팅, 사용자 피드백을 자동 정리해 다음 액션으로 연결하는 AI 노트 랜딩 예시입니다.",
  headline: "회의가 끝난 뒤 흩어지는 맥락을, 바로 실행 가능한 제품 노트로 바꾸세요.",
  subheadline:
    "AI Note는 인터뷰와 회의 기록을 요약하는 데서 멈추지 않고, 액션 아이템과 핵심 인사이트를 팀 워크플로우에 맞게 정리합니다.",
  ctaLabel: "대기자 명단 등록",
  ctaSubtext: "폼 제출 후 데모 초대 링크를 순차 발송합니다.",
  heroHighlights: [
    {
      title: "Capture",
      description: "Zoom, Meet, 대면 인터뷰 메모를 한 번에 정리합니다."
    },
    {
      title: "Summarize",
      description: "요약뿐 아니라 리서치 인사이트와 할 일을 분리해 제공합니다."
    },
    {
      title: "Share",
      description: "제품, 세일즈, CS가 같은 문맥을 공유할 수 있게 만듭니다."
    }
  ],
  problem: {
    eyebrow: "Problem",
    title: "회의는 많아지는데 팀이 같은 맥락을 공유하지 못합니다.",
    description:
      "초기 팀은 인터뷰와 미팅이 쌓일수록 기록 정리와 후속 액션 정리 비용이 커집니다.",
    bullets: [
      "기록은 남지만 핵심 인사이트가 흩어져 있어 다시 읽어야 합니다.",
      "액션 아이템이 사람별로 분산돼 다음 미팅에서 같은 논의가 반복됩니다.",
      "세일즈, 제품, 운영 팀이 같은 고객 발언을 각자 다르게 해석합니다."
    ]
  },
  solution: {
    eyebrow: "Solution",
    title: "하나의 회의 기록을 팀이 바로 쓸 수 있는 실행 자산으로 전환합니다.",
    description:
      "요약, 핵심 발언, 문제 패턴, 다음 액션을 템플릿으로 나눠서 저장합니다.",
    bullets: [
      "회의 종료 직후 핵심 요약과 액션 아이템을 자동 생성합니다.",
      "중요 발언을 주제별로 분류해 리서치 저장소처럼 검색할 수 있습니다.",
      "슬랙, 노션, CRM에 붙일 수 있는 후속 포맷으로 재가공합니다.",
      "랜딩에서 받은 리드도 같은 구조로 저장해 검증 실험과 운영 데이터를 연결합니다."
    ]
  },
  benefits: [
    {
      title: "같은 레이아웃으로 메시지 실험",
      description:
        "랜딩 구조는 재사용하고 카피만 바꿔 어떤 메시지가 전환되는지 빠르게 확인합니다."
    },
    {
      title: "UTM과 CTA 단위 분석",
      description:
        "어떤 유입이 실제 리드 제출로 이어졌는지 랜딩별로 직접 비교할 수 있습니다."
    },
    {
      title: "폼 임베드 대신 직접 수집",
      description:
        "외부 폼의 이탈감을 줄이고, 후속 운영에 필요한 데이터 구조를 직접 소유합니다."
    },
    {
      title: "Vercel 기준 빠른 배포",
      description:
        "새 아이디어가 생기면 콘텐츠만 추가해 같은 프로젝트에서 바로 배포할 수 있습니다."
    }
  ],
  socialProof: [
    {
      label: "Pilot Teams",
      value: "12",
      caption: "파일럿 인터뷰를 예약한 초기 팀 수"
    },
    {
      label: "Hours Saved",
      value: "7h/week",
      caption: "회의 정리와 후속 정리에 줄인 평균 시간"
    },
    {
      label: "Insight Recall",
      value: "3.4x",
      caption: "고객 발언 재검색 속도 개선"
    }
  ],
  faq: [
    {
      question: "아직 제품이 없어도 랜딩 실험부터 가능한가요?",
      answer:
        "가능합니다. 이 템플릿은 아이디어 검증 단계에 맞춰 설계되어 있어 폼 수집과 분석부터 먼저 시작할 수 있습니다."
    },
    {
      question: "리드는 어디에 저장되나요?",
      answer:
        "폼 데이터는 서버에서 검증한 뒤 Supabase의 leads 테이블에 저장합니다. 클라이언트는 직접 insert하지 않습니다."
    },
    {
      question: "랜딩을 하나 더 추가하려면 무엇을 바꾸면 되나요?",
      answer:
        "content 폴더에 새 slug 파일을 추가하고 export 목록에 등록하면 됩니다. UI 컴포넌트는 그대로 재사용합니다."
    }
  ],
  form: {
    title: "가장 먼저 파일럿 소식을 받아보세요",
    description:
      "초기 베타 초대, 고객 인터뷰, 업데이트 알림을 전달할 이메일만 남기면 됩니다.",
    submitLabel: "이메일 등록",
    successMessage: "등록이 완료되었습니다. 베타 오픈 전에 가장 먼저 안내드리겠습니다."
  },
  finalCta: {
    title: "새로운 아이디어가 떠오르면 페이지를 다시 만들 필요가 없습니다.",
    description:
      "이 템플릿은 메시지 실험 속도를 높이는 데 초점을 둡니다. 콘텐츠만 바꾸고 다시 배포하면 됩니다.",
    ctaLabel: "바로 등록하기"
  }
};

