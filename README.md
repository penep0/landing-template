# AI Note Landing

단일 랜딩페이지로 서비스 수요를 검증하고, 이메일 리드를 직접 수집하는 Next.js 프로젝트입니다.

지금 구조는 메인 `/` 랜딩 하나를 빠르게 커스텀하고 운영하는 데 맞춰져 있습니다.

## What It Does

- 메인 페이지 `/`에서 서비스 소개와 관심 등록 폼 제공
- `POST /api/leads`로 리드 저장
- 제출 성공 시 `/thanks` 페이지 이동
- `thanks` 페이지는 폼 제출 성공 후에만 접근 가능
- `UTM`, `referrer`, `cta_variant`, `ip_hash`까지 함께 저장
- 색상, 카피, 로고, FAQ, CTA를 한 파일에서 커스텀 가능

## Stack

- `Next.js 16` App Router
- `TypeScript`
- `Tailwind CSS v4`
- `Supabase`
- `zod`

## Routes

- `/` : 메인 랜딩 페이지
- `/thanks` : 제출 완료 페이지
- `/api/leads` : 리드 저장 API
- `/api/health` : 상태 확인 API
- `/_not-found` : 404 페이지

## Quick Start

```bash
npm install
npm run dev
```

브라우저에서:

```bash
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

`dev`와 `build`는 현재 `webpack` 모드로 실행됩니다. 개발 환경에서 Turbopack 캐시 문제를 피하기 위한 설정입니다.

## Environment Variables

`.env.example` 기준:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

현재 실제로 필수인 값은 아래 둘입니다.

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

`NEXT_PUBLIC_SUPABASE_ANON_KEY`는 예시로 남아 있지만, 현재 코드에서는 직접 사용하지 않습니다.

## Supabase Setup

1. Supabase 프로젝트 생성
2. `.env.local` 생성 후 환경변수 입력
3. [supabase/schema.sql](/Users/yunjeong-yun/Project/landing-template/supabase/schema.sql) 실행
4. 개발 서버 재시작

예시:

```bash
cp .env.example .env.local
```

## DB Schema

현재 스키마 파일:

- [supabase/schema.sql](/Users/yunjeong-yun/Project/landing-template/supabase/schema.sql)

핵심 테이블은 `leads`입니다.

저장되는 주요 필드:

- `landing_slug`
- `name`
- `email`
- `cta_variant`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer`
- `user_agent`
- `ip_hash`
- `created_at`

## Lead Flow

현재 제출 흐름:

1. 사용자가 메인 페이지에서 이메일 입력
2. 클라이언트가 `/api/leads`로 POST
3. 서버에서 `zod` 검증
4. `honeypot` 및 간단한 `rate limit` 검사
5. Supabase `leads` 테이블에 insert
6. 성공 시 접근용 쿠키 발급
7. `/thanks`로 이동

## Thanks Page Access Rule

`/thanks`는 URL 직접 접근으로는 볼 수 없습니다.

- 폼 제출 성공 시에만 접근용 쿠키를 발급
- 쿠키가 없으면 `/thanks` 접근 시 `/`로 리다이렉트

관련 파일:

- [app/thanks/page.tsx](/Users/yunjeong-yun/Project/landing-template/app/thanks/page.tsx)
- [lib/thanks-access.ts](/Users/yunjeong-yun/Project/landing-template/lib/thanks-access.ts)

## Customizing The Page

가장 중요한 파일:

- [content/main-page.ts](/Users/yunjeong-yun/Project/landing-template/content/main-page.ts)

이 파일에서 거의 모든 메인 페이지 데이터를 바꿀 수 있습니다.

### Copy / Content

아래 항목은 모두 `mainPageContent`에서 수정합니다.

- `metadata`
- `brand`
- `nav`
- `hero`
- `problem`
- `solution`
- `benefits`
- `socialProof`
- `leadCapture`
- `faq`
- `finalCta`
- `thanks`
- `footer`

예를 들어:

- 메인 제목 변경 → `mainPageContent.hero.headline`
- CTA 문구 변경 → `mainPageContent.hero.ctaLabel`
- FAQ 수정 → `mainPageContent.faq.items`
- 제출 완료 페이지 문구 수정 → `mainPageContent.thanks`

### Colors / Theme

이제 색상도 `mainPageContent.theme`에서 바꿀 수 있습니다.

수정 가능한 테마 토큰:

- `background`
- `foreground`
- `panel`
- `panelStrong`
- `border`
- `accent`
- `accentStrong`
- `muted`
- `glow`
- `selection`

예시:

```ts
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
}
```

### Logo

로고는 `brand.logo`를 넣으면 상단 네비와 footer에 같이 반영됩니다.

예시:

```ts
brand: {
  name: "AI Note",
  mark: "✦",
  logo: {
    src: "/logo/ai-note.png",
    alt: "AI Note logo",
    width: 36,
    height: 36
  }
}
```

`logo`가 없으면 `mark` 문자를 대신 사용합니다.

이미지 파일은 보통 `public/logo/...` 아래에 두면 됩니다.

### Layout / UI Structure

문구 말고 "구조 자체"를 바꾸고 싶으면 아래 파일을 수정합니다.

- [components/main-page/main-page-view.tsx](/Users/yunjeong-yun/Project/landing-template/components/main-page/main-page-view.tsx)
  페이지 전체 섹션 구조

- [components/main-page/hero-preview-shell.tsx](/Users/yunjeong-yun/Project/landing-template/components/main-page/hero-preview-shell.tsx)
  히어로 오른쪽 preview 박스 구조

- [components/main-page/main-lead-form.tsx](/Users/yunjeong-yun/Project/landing-template/components/main-page/main-lead-form.tsx)
  폼 마크업 및 입력 UI

전역 CSS 기본값은:

- [app/globals.css](/Users/yunjeong-yun/Project/landing-template/app/globals.css)

## File Structure

```txt
app/
  api/
    health/
      route.ts
    leads/
      route.ts
  thanks/
    page.tsx
  globals.css
  layout.tsx
  not-found.tsx
  page.tsx

components/
  analytics/
    page-view-tracker.tsx
    tracked-anchor.tsx
  main-page/
    hero-preview-shell.tsx
    main-lead-form.tsx
    main-page-view.tsx

content/
  main-page.ts

lib/
  analytics.ts
  main-page-theme.ts
  rate-limit.ts
  thanks-access.ts
  utm.ts
  validation/
    lead.ts
  supabase/
    server.ts

supabase/
  schema.sql
```

## Key Files

- [app/page.tsx](/Users/yunjeong-yun/Project/landing-template/app/page.tsx)
  메인 페이지 진입점

- [content/main-page.ts](/Users/yunjeong-yun/Project/landing-template/content/main-page.ts)
  메인 페이지의 모든 콘텐츠와 테마 데이터

- [components/main-page/main-page-view.tsx](/Users/yunjeong-yun/Project/landing-template/components/main-page/main-page-view.tsx)
  메인 랜딩 UI 조립

- [components/main-page/main-lead-form.tsx](/Users/yunjeong-yun/Project/landing-template/components/main-page/main-lead-form.tsx)
  리드 폼 UI 및 제출 처리

- [app/api/leads/route.ts](/Users/yunjeong-yun/Project/landing-template/app/api/leads/route.ts)
  서버 저장 로직

- [lib/supabase/server.ts](/Users/yunjeong-yun/Project/landing-template/lib/supabase/server.ts)
  서버용 Supabase 클라이언트

## Validation

프로젝트 검증 명령:

```bash
npm run lint
npm run typecheck
npm run build
```

## Current Status

현재 상태:

- 메인 랜딩 페이지 구현 완료
- 커스텀 데이터 구조 정리 완료
- 색상/로고 커스텀 가능
- Supabase 연동 코드 구현 완료
- `thanks` 접근 제한 완료

아직 필요한 것:

- 실제 Supabase 프로젝트 생성
- `.env.local` 설정
- `schema.sql` 실행
- 실제 폼 제출 테스트
