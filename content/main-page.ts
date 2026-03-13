// Main landing customization guide
//
// 1. Most copy changes happen inside `mainPageContent`.
// 2. If you only want to change text, counts, labels, or placeholders,
//    edit this file and avoid touching component files.
// 3. If you want to change layout/markup itself, update:
//    - components/main-page/main-page-view.tsx
//    - components/main-page/hero-preview-shell.tsx
//    - components/main-page/main-lead-form.tsx

export type MainPageNavItem = {
  label: string;
  href: string;
};

export type MainPageInfoCard = {
  title: string;
  description: string;
};

export type MainPageThanksAction = {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  external?: boolean;
};

export type MainPageTheme = {
  background: string;
  foreground: string;
  panel: string;
  panelStrong: string;
  border: string;
  accent: string;
  accentStrong: string;
  muted: string;
  glow: string;
  selection: string;
};

export type MainPageBrandLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type MainPageHeroPreview = {
  icon: string;
  title: string;
  meta: string;
  summaryLabel: string;
  summaryText: string;
  cards: MainPageInfoCard[];
};

export type MainPageProblemCard = {
  icon: string;
  title: string;
  description: string;
};

export type MainPageSolutionGridItem = {
  label: string;
  description: string;
  tone: "soft" | "dark" | "default" | "primary";
};

export type MainPageSocialProofItem = {
  label: string;
  value: string;
  caption: string;
};

export type MainPageFaqItem = {
  question: string;
  answer: string;
};

export type MainPageFormCopy = {
  title?: string;
  description?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  messageHelperText?: string;
  submitLabel: string;
  submittingLabel: string;
  helperText: string;
  networkError: string;
  submitErrorFallback: string;
};

export type MainPageContent = {
  theme: MainPageTheme;
  metadata: {
    title: string;
    description: string;
  };
  tracking: {
    landingSlug: string;
  };
  brand: {
    name: string;
    mark: string;
    logo?: MainPageBrandLogo;
  };
  nav: {
    items: MainPageNavItem[];
    ctaLabel: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaLabel: string;
    ctaSubtext: string;
    preview: MainPageHeroPreview;
    form: MainPageFormCopy;
  };
  problem: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    cards: MainPageProblemCard[];
  };
  solution: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    gridItems: MainPageSolutionGridItem[];
    points: string[];
  };
  benefits: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    itemLabel: string;
    items: MainPageInfoCard[];
  };
  socialProof: {
    eyebrow: string;
    title: string;
    description: string;
    items: MainPageSocialProofItem[];
  };
  leadCapture: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    form: MainPageFormCopy;
  };
  faq: {
    id: string;
    title: string;
    items: MainPageFaqItem[];
  };
  finalCta: {
    title: string;
    description: string;
    ctaLabel: string;
  };
  thanks: {
    eyebrow: string;
    title: string;
    description: string;
    actions: MainPageThanksAction[];
    backHomeLabel: string;
  };
  footer: {
    copyright: string;
    disclaimer: string;
  };
};

export const mainPageContent: MainPageContent = {
  // Global theme tokens for the main page and thanks page
  // Change these values if you want to customize colors without touching CSS.
  theme: {
    background: "#f5f7f8",
    foreground: "#0f172a",
    panel: "#ffffff",
    panelStrong: "#ffffff",
    border: "#e2e8f0",
    accent: "#3c83f6",
    accentStrong: "#2f72dc",
    muted: "#64748b",
    glow: "rgba(60, 131, 246, 0.18)",
    selection: "rgba(60, 131, 246, 0.2)"
  },
  // Browser title and description
  metadata: {
    title: "AI Note - 회의와 인터뷰 기록의 새로운 기준",
    description:
      "AI Note는 회의, 인터뷰, 사용자 피드백을 더 쉽게 정리하고 활용할 수 있도록 돕는 서비스 아이디어입니다. 현재 실제 수요를 확인하는 단계입니다."
  },
  // Internal identifier used by analytics, lead API, and thanks access
  tracking: {
    landingSlug: "ai-note"
  },
  // Top-left brand area
  brand: {
    name: "AI Note",
    mark: "✦"
    // Example:
    // logo: {
    //   src: "/logo/ai-note.png",
    //   alt: "AI Note logo",
    //   width: 36,
    //   height: 36
    // }
  },
  // Sticky top navigation
  nav: {
    items: [
      { label: "문제점", href: "#problem" },
      { label: "해결 방향", href: "#solution" },
      { label: "핵심 가치", href: "#benefits" },
      { label: "FAQ", href: "#faq" }
    ],
    ctaLabel: "출시 소식 받기"
  },
  // First screen: badge, headline, subheadline, hero CTA, right preview box
  hero: {
    badge: "서비스 준비 중",
    headline: "회의와 인터뷰 기록, 정리가 아니라 활용까지 이어지고 있나요?",
    subheadline:
      "AI Note는 회의, 인터뷰, 사용자 피드백을 더 쉽게 정리하고 활용할 수 있도록 돕는 서비스 아이디어입니다. 현재 실제 수요를 확인하는 단계이며, 사용해보고 싶다면 이메일을 남겨주세요.",
    ctaLabel: "출시 소식 받기",
    ctaSubtext: "등록 시 출시 소식과 얼리버드 혜택을 가장 먼저 보내드립니다.",
    preview: {
      icon: "☎",
      title: "사용자 인터뷰 #42",
      meta: "초기 검증 미리보기",
      summaryLabel: "AI 요약",
      summaryText:
        "사용자들은 검색 필터 과정의 불편을 반복적으로 언급했습니다. 모바일 환경의 뒤로가기 경험 개선이 가장 시급한 액션으로 보입니다.",
      cards: [
        {
          title: "Capture",
          description: "Zoom, Meet, 대면 인터뷰 메모를 한 번에 정리합니다."
        },
        {
          title: "Summarize",
          description: "핵심 요약과 인사이트, 액션 아이템을 분리해서 제공합니다."
        },
        {
          title: "Share",
          description: "제품, 세일즈, 운영팀이 같은 맥락을 공유할 수 있게 만듭니다."
        }
      ]
    },
    form: {
      emailPlaceholder: "이메일 주소를 입력해주세요",
      messageLabel: "의견 남기기 (선택)",
      messagePlaceholder:
        "이 서비스가 왜 필요하다고 느끼는지, 어떤 상황에서 쓰고 싶은지 적어주세요.",
      messageHelperText:
        "짧은 의견도 좋습니다. 남겨주시면 제품 방향을 정하는 데 큰 도움이 됩니다.",
      submitLabel: "출시 소식 받기",
      submittingLabel: "제출 중...",
      helperText: "등록 시 출시 소식과 얼리버드 혜택을 가장 먼저 보내드립니다.",
      networkError: "네트워크 오류로 제출하지 못했습니다.",
      submitErrorFallback: "제출 중 문제가 발생했습니다."
    }
  },
  // Problem section cards
  problem: {
    id: "problem",
    eyebrow: "Problem",
    title: "기록은 쌓이는데, 다시 보기는 힘드셨죠? 아니요!!",
    description:
      "수많은 미팅 기록과 인터뷰 데이터 속에서 중요한 인사이트를 찾는 일은 늘 번거롭고 많은 시간이 소요됩니다. 정리 자체에 에너지를 쏟느라 정작 중요한 실행을 놓치고 있지는 않나요?",
    cards: [
      {
        icon: "⌛",
        title: "반복되는 전사 작업",
        description:
          "녹음 파일을 다시 들으며 텍스트로 옮기거나 요약하는 데 미팅 시간 이상의 비용이 들어갑니다."
      },
      {
        icon: "⌕",
        title: "파편화된 정보",
        description:
          "누가 어떤 말을 했는지, 결정된 사항이 무엇인지 찾기 위해 여러 문서를 다시 뒤져야 합니다."
      },
      {
        icon: "☰",
        title: "실행되지 않는 액션 아이템",
        description:
          "회의 중 정해졌던 다음 할 일이 기록되지 않거나 흩어져서 실제 실행으로 이어지지 않습니다."
      }
    ]
  },
  // Solution section: left grid cards + right bullet list
  solution: {
    id: "solution",
    eyebrow: "Solution",
    title: "AI가 제안하는 새로운 기록의 흐름",
    description:
      "단순한 텍스트 변환을 넘어, 회의와 인터뷰 기록을 실제 업무 흐름에 연결할 수 있는 스마트한 노트를 제안합니다.",
    gridItems: [
      {
        label: "실시간 정리",
        description: "회의 내용을 빠르게 구조화해 바로 다시 볼 수 있는 기록으로 전환합니다.",
        tone: "soft"
      },
      {
        label: "지능형 요약",
        description: "핵심 내용만 빠르게 파악할 수 있도록 맥락 중심으로 요약합니다.",
        tone: "dark"
      },
      {
        label: "자동 액션",
        description: "회의 중 정해진 다음 할 일을 자연스럽게 분리해 놓치지 않게 돕습니다.",
        tone: "default"
      },
      {
        label: "인사이트 추출",
        description: "반복되는 불편, 중요한 요청, 제품 힌트를 자동으로 정리합니다.",
        tone: "primary"
      }
    ],
    points: [
      "자동 요약 및 핵심 정리로 긴 회의록을 다시 읽지 않아도 됩니다.",
      "사용자 인터뷰에서 반복되는 패턴과 중요한 피드백을 빠르게 분류할 수 있습니다.",
      "회의 중 결정된 다음 할 일을 리스트업해 업무 누락을 줄일 수 있습니다.",
      "실제 서비스 출시 전, 관심 등록과 사용 의향 데이터부터 먼저 검증할 수 있습니다."
    ]
  },
  // Benefit section cards
  benefits: {
    id: "benefits",
    eyebrow: "기능",
    title: "초기 검증 페이지에 필요한 핵심 메시지만 남겼습니다.",
    description:
      "완성된 제품을 과장해 보이기보다, 사람들이 실제로 관심을 보이는지 확인하는 데 필요한 가치만 간결하게 전달합니다.",
    itemLabel: "Benefit",
    items: [
      {
        title: "같은 레이아웃으로 메시지 실험",
        description:
          "랜딩 구조는 유지하고 카피만 바꿔 어떤 메시지가 더 반응을 만드는지 빠르게 비교할 수 있습니다."
      },
      {
        title: "UTM과 CTA 단위 분석",
        description:
          "어떤 유입이 실제 리드 제출로 이어졌는지 데이터 기준으로 바로 확인할 수 있습니다."
      },
      {
        title: "폼 임베드 대신 직접 수집",
        description:
          "외부 폼 이탈을 줄이고, 후속 운영에 필요한 데이터 구조를 직접 소유할 수 있습니다."
      },
      {
        title: "빠른 배포와 반복 실험",
        description:
          "새로운 아이디어가 생기면 콘텐츠만 수정해서 같은 코드베이스에서 바로 검증을 시작할 수 있습니다."
      }
    ]
  },
  // Metrics / proof section
  socialProof: {
    eyebrow: "관심 지표",
    title: "실제 사용 의향을 확인하기 위한 최소한의 숫자",
    description:
      "정식 출시 전에도 인터뷰 수, 대기 등록 수, 기대 효과 같은 지표는 충분히 설득력 있는 관심 신호가 됩니다.",
    items: [
      {
        label: "Pilot Teams",
        value: "12",
        caption: "파일럿 인터뷰를 예약한 초기 팀 수"
      },
      {
        label: "Hours Saved",
        value: "7h/week",
        caption: "회의 정리와 후속 정리에 줄일 수 있다고 본 예상 시간"
      },
      {
        label: "Insight Recall",
        value: "3.4x",
        caption: "고객 발언 재검색 속도 개선 기대치"
      }
    ]
  },
  // Main signup section in the middle of the page
  leadCapture: {
    id: "lead-capture",
    eyebrow: "관심 등록",
    title: "가장 먼저 AI Note를 만나보세요",
    description:
      "이 프로젝트는 현재 초기 검증 단계입니다. 이메일을 남겨주시면 정식 출시 시 가장 먼저 알림을 드리고, 얼리버드 혜택을 제공해 드립니다.",
    form: {
      title: "관심 등록하기",
      description:
        "사용 의향이 있다면 간단한 정보만 남겨주세요. 출시 소식과 초기 테스트 안내를 보내드립니다.",
      nameLabel: "이름 (선택)",
      namePlaceholder: "성함을 입력해주세요",
      emailLabel: "이메일 *",
      emailPlaceholder: "example@email.com",
      messageLabel: "의견 남기기 (선택)",
      messagePlaceholder:
        "이 서비스에 기대하는 점이나 꼭 필요하다고 느낀 이유를 남겨주세요.",
      messageHelperText:
        "의견이 포함된 제출은 스팸 방지를 위해 더 짧은 간격으로는 반복 제출할 수 없습니다.",
      submitLabel: "얼리 액세스 신청하기",
      submittingLabel: "제출 중...",
      helperText: "신청하신 정보는 출시 소식 안내 및 서비스 개선을 위한 용도로만 사용됩니다.",
      networkError: "네트워크 오류로 제출하지 못했습니다.",
      submitErrorFallback: "제출 중 문제가 발생했습니다."
    }
  },
  // FAQ accordion
  faq: {
    id: "faq",
    title: "자주 묻는 질문",
    items: [
      {
        question: "언제 정식 출시되나요?",
        answer:
          "현재는 아이디어 검증 및 프로토타입 단계입니다. 충분한 수요가 확인되면 베타 버전을 우선적으로 준비할 예정입니다."
      },
      {
        question: "한국어 지원을 염두에 두고 있나요?",
        answer:
          "네. 한국어 회의와 인터뷰 환경에서 자연스럽게 쓸 수 있도록 문맥과 업무 용어를 고려한 방향으로 검토하고 있습니다."
      },
      {
        question: "입력한 정보는 어디에 사용되나요?",
        answer:
          "등록한 이메일과 이름은 출시 소식 안내, 초기 사용자 인터뷰 제안, 서비스 수요 검증을 위한 목적으로만 사용됩니다."
      }
    ]
  },
  // Final call-to-action block near the bottom
  finalCta: {
    title: "이 서비스가 필요하다면, 먼저 이메일로 알려주세요.",
    description:
      "아직은 실제 서비스 출시 전 단계입니다. 하지만 관심 등록이 충분히 모인다면 가장 먼저 베타 테스트와 업데이트 소식을 안내드릴 예정입니다.",
    ctaLabel: "출시 알림 받기"
  },
  // Success page copy shown after a valid form submission
  thanks: {
    eyebrow: "Thank You",
    title: "관심 등록이 완료되었습니다. 출시 소식을 가장 먼저 안내드릴게요.",
    description:
      "검토 후 가장 먼저 연락드릴 채널로 안내를 보내겠습니다. 빠른 대화가 필요하면 아래 다음 액션을 바로 연결할 수 있습니다.",
    actions: [
      {
        title: "캘린더 예약",
        description:
          "초기 사용자 인터뷰나 데모 콜을 연결하는 다음 액션 영역입니다.",
        linkLabel: "예약 링크 열기",
        href: "https://www.notion.so/feat-4L-22409d059e47803d92edfe769e338be4?source=copy_link",
        external: true
      },
      {
        title: "커뮤니티 초대",
        description:
          "오픈채팅, 디스코드, 대기자 명단 후속 채널에 연결할 수 있습니다.",
        linkLabel: "커뮤니티 열기",
        href: "https://www.notion.so/feat-4L-22409d059e47803d92edfe769e338be4?source=copy_link",
        external: true
      },
      {
        title: "추가 자료",
        description:
          "제품 소개서, 사례, 데모 영상 같은 자료를 제공할 수 있습니다.",
        linkLabel: "자료 보기",
        href: "https://www.notion.so/your-page",
        // external: true
      }
    ],
    backHomeLabel: "홈으로 돌아가기"
  },
  // Footer copy
  footer: {
    copyright: "© 2026 AI Note Team. All rights reserved.",
    disclaimer:
      "본 페이지는 서비스의 수요를 파악하기 위한 랜딩 페이지입니다. 실제 서비스 제공 여부는 신청 현황과 검증 결과에 따라 결정됩니다."
  }
};
