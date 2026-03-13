# Landing Template

단일 랜딩페이지를 빠르게 커스텀해서 배포하고, 관심 등록과 의견 수집까지 직접 운영할 수 있게 만든 `Next.js` 템플릿입니다.

현재 구조는 "여러 랜딩을 동시에 운영하는 CMS"가 아니라, 메인 `/` 랜딩 하나를 빠르게 바꿔가며 수요 검증을 반복하는 데 맞춰져 있습니다.

## What It Does

- 메인 랜딩 `/` 제공
- 이메일 기반 관심 등록 수집
- 별도 의견 텍스트 수집
- `Supabase`에 `leads`와 `feedbacks` 분리 저장
- `UTM`, `referrer`, `cta_variant`, `ip_hash` 저장
- `Vercel Analytics` 연동
- 제출 성공 후에만 접근 가능한 `/thanks` 페이지 제공
- 랜딩 카피, 색상, 로고, FAQ, CTA를 한 파일에서 커스텀 가능

## Stack

- `Next.js 16`
- `TypeScript`
- `Tailwind CSS v4`
- `Supabase`
- `zod`
- `@vercel/analytics`

## Routes

- `/` : 메인 랜딩
- `/thanks` : 관심 등록 완료 페이지
- `/api/leads` : 관심 등록 / 의견 제출 API
- `/api/health` : 환경설정 확인 API
- `/_not-found` : 404 페이지

## Project Structure

```txt
app/
  api/
    health/route.ts
    leads/route.ts
  globals.css
  layout.tsx
  not-found.tsx
  page.tsx
  thanks/page.tsx

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
  supabase/server.ts
  thanks-access.ts
  utm.ts
  validation/lead.ts

supabase/
  schema.sql
```

## Quick Start

```bash
npm install
npm run dev
```

브라우저에서:

```txt
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

`dev`와 `build`는 현재 `webpack` 모드로 실행됩니다.

## Environment Variables

`.env.local` 예시:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

현재 실제 필수값:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

현재 코드에서 직접 사용하지 않는 값:

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

즉 최소 실행만 보면 아래 두 개면 됩니다.

```env
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Supabase Setup

1. Supabase 프로젝트 생성
2. 루트에 `.env.local` 생성
3. Supabase Dashboard에서 URL / key 복사
4. [supabase/schema.sql](/Users/yunjeong-yun/Project/landing-template/supabase/schema.sql) 실행
5. 개발 서버 재시작

예시:

```bash
cp .env.example .env.local
```

`.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

확인:

- `http://localhost:3000/api/health`

정상 연결 후 테스트:

1. 메인 페이지에서 `베타 알림 받기` 제출
2. `leads` 테이블 row 생성 확인
3. 의견 제출
4. `feedbacks` 테이블 row 생성 확인

## Database Schema

스키마 파일:

- [supabase/schema.sql](/Users/yunjeong-yun/Project/landing-template/supabase/schema.sql)

사용 테이블:

- `public.leads`
- `public.feedbacks`

`leads`는 이메일 기반 관심 등록용입니다.

주요 컬럼:

- `landing_slug`
- `name`
- `email`
- `cta_variant`
- `utm_*`
- `referrer`
- `user_agent`
- `ip_hash`
- `created_at`

`feedbacks`는 의견 텍스트 수집용입니다.

주요 컬럼:

- `landing_slug`
- `name`
- `email`
- `message`
- `cta_variant`
- `utm_*`
- `referrer`
- `user_agent`
- `ip_hash`
- `created_at`

## Submission Flow

### 1. 관심 등록

- 사용자가 이메일 입력
- `/api/leads`로 요청
- 서버 검증 후 `leads` 저장
- 성공 시 접근용 쿠키 발급
- `/thanks`로 이동

### 2. 의견 제출

- 사용자가 의견 텍스트 입력
- `/api/leads`로 요청
- 서버 검증 후 `feedbacks` 저장
- 성공 시 현재 페이지에 성공 메시지만 표시
- `/thanks`로는 이동하지 않음

## Spam / Abuse Protection

현재 방어는 두 단계입니다.

- 모든 요청: 메모리 기반 기본 rate limit
- 의견 제출: `feedbacks` 테이블 기준 추가 제한

의견 제출 제한 방식:

- 같은 `landing_slug`
- 같은 `ip_hash`
- 최근 `10분`
- `2회 이상`이면 차단

즉, 의견 제출은 서버 재시작과 무관하게 `Supabase`의 실제 기록 기준으로 제한됩니다.

## Thanks Page Rule

`/thanks`는 직접 URL로 열 수 없습니다.

- 관심 등록 성공 시에만 `httpOnly` 쿠키 발급
- 쿠키가 없으면 `/thanks` 접근 시 `/`로 리다이렉트

관련 파일:

- [app/thanks/page.tsx](/Users/yunjeong-yun/Project/landing-template/app/thanks/page.tsx)
- [lib/thanks-access.ts](/Users/yunjeong-yun/Project/landing-template/lib/thanks-access.ts)

## Analytics

현재 수집되는 항목:

- `Vercel Analytics`
  - 방문자
  - 페이지뷰
  - CTA 클릭
  - 폼 시작
  - 관심 등록 성공
  - 의견 제출 성공

- `Supabase`
  - 실제 이메일 등록 데이터
  - 실제 의견 데이터
  - `utm_*`
  - `referrer`
  - `cta_variant`

관련 파일:

- [app/layout.tsx](/Users/yunjeong-yun/Project/landing-template/app/layout.tsx)
- [lib/analytics.ts](/Users/yunjeong-yun/Project/landing-template/lib/analytics.ts)
- [components/analytics/tracked-anchor.tsx](/Users/yunjeong-yun/Project/landing-template/components/analytics/tracked-anchor.tsx)

## Customization

가장 중요한 파일:

- [content/main-page.ts](/Users/yunjeong-yun/Project/landing-template/content/main-page.ts)

이 파일 하나에서 거의 모든 랜딩 데이터를 바꿀 수 있습니다.

### Text / Content

아래 섹션은 전부 `mainPageContent` 안에서 수정합니다.

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

예시:

- 메인 제목 변경 -> `mainPageContent.hero.headline`
- 네비 버튼 문구 변경 -> `mainPageContent.nav.ctaLabel`
- FAQ 변경 -> `mainPageContent.faq.items`
- thanks 페이지 문구 변경 -> `mainPageContent.thanks`

### Form Copy

폼 문구도 `main-page.ts`에서 바꿉니다.

예시 키:

- `hero.form.submitLabel`
- `hero.form.feedbackSubmitLabel`
- `hero.form.feedbackSuccessMessage`
- `leadCapture.form.emailPlaceholder`
- `leadCapture.form.feedbackRequiredError`

### Theme / Colors

색상은 `mainPageContent.theme`에서 바꿉니다.

수정 가능한 토큰:

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
  background: "#f4f7fb",
  foreground: "#0f172a",
  panel: "#ffffff",
  panelStrong: "#ffffff",
  border: "#dbe5f0",
  accent: "#2f6fed",
  accentStrong: "#1f5ad1",
  muted: "#5b6b82",
  glow: "rgba(47, 111, 237, 0.18)",
  selection: "rgba(47, 111, 237, 0.18)"
}
```

### Logo

`brand.logo`를 넣으면 상단 네비와 footer 로고가 함께 바뀝니다.

예시:

```ts
brand: {
  name: "My Product",
  mark: "M",
  logo: {
    src: "/logo/my-product.png",
    alt: "My Product logo",
    width: 36,
    height: 36
  }
}
```

`logo`가 없으면 `mark` 문자열을 사용합니다.

### Layout / UI

문구가 아니라 구조를 바꾸고 싶으면 아래 파일을 수정합니다.

- [components/main-page/main-page-view.tsx](/Users/yunjeong-yun/Project/landing-template/components/main-page/main-page-view.tsx)
  - 전체 섹션 구성

- [components/main-page/hero-preview-shell.tsx](/Users/yunjeong-yun/Project/landing-template/components/main-page/hero-preview-shell.tsx)
  - 히어로 오른쪽 프리뷰 카드

- [components/main-page/main-lead-form.tsx](/Users/yunjeong-yun/Project/landing-template/components/main-page/main-lead-form.tsx)
  - 이메일 등록 / 의견 제출 폼 UI

- [app/globals.css](/Users/yunjeong-yun/Project/landing-template/app/globals.css)
  - 전역 스타일

## Vercel Deployment

가장 쉬운 방법은 Git 저장소를 Vercel에 연결하는 방식입니다.

1. 코드를 GitHub 또는 GitLab에 push
2. Vercel Dashboard에서 `Add New > Project`
3. 저장소 import
4. Framework는 `Next.js` 자동 감지
5. Environment Variables 입력
6. Deploy

### Vercel Environment Variables

프로젝트 Settings > Environment Variables에 아래 값을 넣습니다.

```env
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

권장:

- `Production` 체크
- `Preview` 체크

### Deploy Checklist

배포 전에 확인:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Supabase `schema.sql` 적용 완료
- Vercel 환경변수 입력 완료

배포 후 확인:

1. `/api/health` 열기
2. 이메일 등록 테스트
3. 의견 제출 테스트
4. Supabase `leads` / `feedbacks` 확인
5. Vercel Analytics 대시보드 확인

## Health Check

`/api/health`는 현재 서버 시각과 Supabase env 설정 여부를 반환합니다.

예시 응답:

```json
{
  "ok": true,
  "timestamp": "2026-03-13T12:34:56.000Z",
  "supabaseConfigured": true
}
```

## Notes

- 현재 템플릿은 단일 랜딩 기준입니다.
- 실제 서비스 내용은 [content/main-page.ts](/Users/yunjeong-yun/Project/landing-template/content/main-page.ts)만 바꾸면 대부분 교체할 수 있습니다.
- `SUPABASE_SERVICE_ROLE_KEY`는 절대 Git에 올리면 안 됩니다.
- `thanks.actions.href` 같은 실제 링크 값은 직접 채워야 합니다.
