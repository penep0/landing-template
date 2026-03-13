# Landing Template

아이디어를 빠르게 검증하기 위한 재사용형 랜딩페이지 템플릿 프로젝트입니다.

## 빠른 시작

1. `npm install`
2. `.env.example`을 참고해 `.env.local` 생성
3. `supabase/schema.sql`을 Supabase SQL Editor에서 실행
4. `npm run dev`

샘플 랜딩:

- `/ai-note`
- `/resume-helper`

목표는 매번 새로운 랜딩을 처음부터 만드는 대신, 공통 템플릿과 공통 수집 구조를 재사용하면서 `카피`, `이미지`, `CTA`, `slug`만 바꿔 빠르게 배포하는 것입니다.

## 목표

- 하나의 코드베이스로 여러 아이디어를 검증한다.
- 공통 레이아웃, 컴포넌트, 배포 구조를 재사용한다.
- 리드 수집은 외부 폼이 아니라 자체 페이지에서 직접 처리한다.
- 실험마다 `유입`, `CTA 클릭`, `폼 제출`, `전환율`을 비교 가능하게 만든다.

## 핵심 방향

- 페이지 구조는 공통 템플릿으로 유지한다.
- 아이디어별 차이는 콘텐츠 파일로 분리한다.
- 폼 제출은 서버를 거쳐 `Supabase`에 저장한다.
- 배포는 `Vercel`에서 빠르게 반복한다.

## 추천 기술 스택

- 프레임워크: `Next.js` `App Router` + `TypeScript`
- 스타일: `Tailwind CSS`
- 데이터베이스: `Supabase`
- 폼 처리: `Route Handler` 또는 `Server Action`
- 데이터 검증: `zod`
- 분석: `GA4` 또는 `Plausible`
- 배포: `Vercel`
- 스팸 방지: `honeypot` + `rate limit` + 필요 시 `Cloudflare Turnstile`

## 왜 이 조합인가

- `Next.js`는 SEO, 메타태그, OG, 서버 처리에 유리하다.
- `Tailwind CSS`는 랜딩 페이지를 빠르게 반복 제작하기 좋다.
- `Supabase`는 리드 데이터를 직접 소유하면서도 구축 비용이 낮다.
- `Vercel`은 Git 기반 배포와 Preview 배포 흐름이 단순하다.

## 제품 운영 방식

하나의 프로젝트 안에서 여러 랜딩을 `slug` 기준으로 운영한다.

예시:

- `yourdomain.com/ai-note`
- `yourdomain.com/resume-helper`
- `yourdomain.com/meeting-copilot`

새로운 아이디어가 생기면 페이지 구조를 다시 만들지 않고, 해당 아이디어에 대한 콘텐츠 파일만 추가해서 같은 템플릿으로 배포한다.

## 전체 아키텍처

사용자 흐름:

`랜딩 방문 -> CTA 클릭 -> 폼 입력 -> 서버 검증 -> Supabase 저장 -> thank you 페이지 이동`

핵심 원칙:

- 브라우저는 입력과 표시만 담당한다.
- 리드 저장은 서버에서 처리한다.
- 분석과 추적에 필요한 UTM 정보를 함께 저장한다.
- 공통 UI와 공통 데이터 수집 구조를 유지한다.

## 페이지 구조

- `/[slug]`: 아이디어별 랜딩 페이지
- `/thanks`: 제출 완료 페이지
- `/api/leads`: 리드 저장 API
- `/admin`: 추후 내부 조회 페이지
- `/api/health`: 선택적 상태 확인 API

## 권장 섹션 구성

- `Hero`
- `Problem`
- `Solution`
- `BenefitList`
- `SocialProof`
- `FAQ`
- `FinalCTA`

이 섹션들은 컴포넌트화하고, 실제 내용은 각 `slug`별 콘텐츠 파일에서 주입한다.

## 콘텐츠 관리 방식

아이디어별 페이지 내용은 `content/*.ts` 또는 `content/*.json`으로 관리한다.

예시 데이터 필드:

- `title`
- `headline`
- `subheadline`
- `ctaLabel`
- `benefits`
- `faq`
- `heroImage`
- `formType`
- `successMessage`

예시 파일:

- `content/ai-note.ts`
- `content/resume-helper.ts`

## 폼 수집 방식

외부 폼 임베드 대신, 랜딩 페이지 안에서 직접 입력받고 서버를 통해 `Supabase`에 저장한다.

권장 흐름:

1. 사용자가 랜딩 페이지에서 폼을 작성한다.
2. 프론트엔드가 1차 검증을 수행한다.
3. `POST /api/leads`로 데이터를 전송한다.
4. 서버에서 `zod`로 2차 검증을 수행한다.
5. `honeypot`, `rate limit`, 중복 체크를 확인한다.
6. `Supabase`의 `leads` 테이블에 저장한다.
7. 성공 시 `/thanks?slug=...` 페이지로 이동한다.

## Supabase를 쓰는 이유

- `Postgres` 기반이라 데이터 구조 확장이 쉽다.
- 리드 데이터를 직접 소유할 수 있다.
- `UTM`, `referrer`, `landing_slug` 같은 마케팅 정보를 함께 저장하기 좋다.
- 이후 이메일 발송, 관리자 화면, 자동화 연결이 쉽다.

## 권장 DB 스키마

초기에는 `landings`, `leads` 두 개 테이블이면 충분하다.

### `landings`

- `id`
- `slug` `unique`
- `name`
- `status` (`draft`, `active`, `archived`)
- `created_at`

### `leads`

- `id`
- `landing_slug`
- `name`
- `email`
- `phone`
- `message`
- `company`
- `job_title`
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

## 최소 SQL 예시

```sql
create table public.landings (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.leads (
  id bigint generated always as identity primary key,
  landing_slug text not null,
  name text,
  email text not null,
  phone text,
  message text,
  company text,
  job_title text,
  cta_variant text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  user_agent text,
  ip_hash text,
  created_at timestamptz not null default now()
);

create index leads_landing_slug_idx on public.leads (landing_slug);
create index leads_created_at_idx on public.leads (created_at desc);
create index leads_email_idx on public.leads (email);
```

## 중복 제출 정책

운영 방식에 따라 둘 중 하나를 선택한다.

- 엄격 차단: `unique (landing_slug, email)` 적용
- 느슨한 허용: 중복 저장 후 운영에서 정리

초기 검증 단계에서는 느슨하게 받고, 이후 필요 시 중복 정책을 강화하는 편이 실용적이다.

## 보안 및 권한 정책

`Supabase` 사용 시 가장 중요한 원칙은 클라이언트에 민감한 키를 노출하지 않는 것이다.

- 브라우저에는 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`만 사용 가능
- 서버에서는 `SUPABASE_SERVICE_ROLE_KEY` 사용
- `service_role` 키는 절대 클라이언트에 노출하지 않음

권장 방식:

- 브라우저는 폼 데이터만 API로 전송
- 서버가 `Supabase`에 insert 수행
- `leads` 테이블은 클라이언트 직접 insert를 허용하지 않음

## RLS 정책

`RLS`는 켜는 것을 권장한다.

초기 구조에서는 서버만 데이터 저장을 담당하므로 아래 방향이 단순하다.

- `leads` 테이블은 공개 조회 불가
- 클라이언트 직접 insert 불가
- 서버만 `service_role`로 insert 가능

이렇게 하면 스팸, 오용, 키 노출 위험을 줄이기 쉽다.

## 폼 필드 권장안

초기 검증에서는 필드 수를 최소화하는 것이 전환율에 유리하다.

기본 권장:

- 필수: `email`
- 선택: `name`

아이디어에 따라 선택적으로 추가:

- `phone`
- `message`
- `company`
- `job_title`

초기 MVP에서는 `email + name(optional)` 조합을 우선 추천한다.

## API 예시

`POST /api/leads`

예시 요청:

```json
{
  "landingSlug": "ai-note",
  "name": "홍길동",
  "email": "test@example.com",
  "phone": "",
  "message": "",
  "ctaVariant": "hero-primary",
  "utm": {
    "source": "google",
    "medium": "cpc",
    "campaign": "waitlist-launch",
    "term": "",
    "content": "headline-a"
  },
  "referrer": "https://google.com"
}
```

## 검증 규칙

- `landingSlug`: 필수, 허용된 slug인지 확인
- `email`: 필수, 이메일 형식 검증
- `name`: 길이 제한
- `message`: 길이 제한
- `honeypot`: 반드시 비어 있어야 함
- 짧은 시간 내 반복 제출은 차단 가능

## UTM 수집 방식

마케팅 실험 비교를 위해 UTM 값을 저장한다.

권장 흐름:

- 랜딩 진입 시 URL 쿼리에서 `utm_*` 읽기
- `localStorage` 또는 hidden input에 저장
- 폼 제출 시 함께 서버로 전달
- `Supabase`에 리드와 함께 저장

이렇게 하면 어떤 유입 채널이 실제 전환으로 이어졌는지 바로 분석 가능하다.

## 감사 페이지

제출 완료 후 이동 페이지:

- `/thanks?slug=ai-note`

이 페이지에서 할 수 있는 것:

- 제출 완료 메시지 표시
- 다음 행동 유도
- 추가 공유 CTA 제공

예시 CTA:

- 캘린더 예약
- 오픈채팅 입장
- 친구 공유
- 제품 데모 보기

## 분석 이벤트

최소한 아래 이벤트는 추적한다.

- `page_view`
- `hero_cta_click`
- `form_start`
- `form_submit_success`
- `thank_you_view`

실험 초기에는 이 정도만으로도 랜딩 성과 비교에 충분하다.

## 스팸 방지 전략

초기 권장 조합:

- 숨김 `honeypot` 필드
- 서버 검증
- 간단한 `rate limit`

트래픽 증가 시 추가:

- `Cloudflare Turnstile`
- 이메일 중복 체크
- IP/디바이스 기준 제한 강화

## 추천 폴더 구조

```txt
app/
  [slug]/
    page.tsx
  thanks/
    page.tsx
  api/
    leads/
      route.ts

components/
  landing/
    hero.tsx
    benefit-list.tsx
    faq.tsx
    lead-form.tsx
    final-cta.tsx

content/
  ai-note.ts
  resume-helper.ts
  index.ts

lib/
  supabase/
    server.ts
  analytics.ts
  utm.ts
  validation/
    lead.ts
```

## 배포 방식

초기 권장 방식은 `Vercel` 단일 프로젝트 운영이다.

- 하나의 프로젝트에 여러 `slug` 페이지를 포함한다.
- `main` 브랜치에 push 하면 production 배포한다.
- Pull Request마다 preview 배포를 활용한다.
- 성과가 좋은 아이디어만 추후 독립 도메인 또는 독립 프로젝트로 분리한다.

## 환경 변수

`Vercel`에 아래 환경 변수를 등록한다.

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_GA_ID` 또는 `PLAUSIBLE_DOMAIN`

## 도메인 운영 계획

### 1단계

- `yourdomain.com/[slug]`

장점:

- 가장 빠르게 운영 가능
- 코드와 배포 관리가 단순함

### 2단계

- `idea.yourdomain.com`

조건:

- 특정 아이디어가 성과가 좋을 때만 분리

### 3단계

- 독립 리포지토리 + 독립 도메인

조건:

- 검증이 끝나고 제품화 단계로 넘어갈 때

## 구현 우선순위

### 1차 MVP

- `Next.js` 기본 세팅
- 공통 랜딩 섹션 컴포넌트 작성
- `slug` 기반 다중 랜딩 라우팅
- `Supabase` 연결
- `/api/leads` 구현
- `/thanks` 페이지 구현

### 2차 개선

- UTM 저장
- 분석 스크립트 연결
- 스팸 방지 강화
- README 및 운영 문서 보완

### 3차 확장

- 관리자 조회 페이지
- A/B 테스트
- OG 이미지 자동화
- 이메일 자동 발송

## 실무 운영 원칙

- 템플릿은 재사용하되 카피는 매번 새로 맞춘다.
- 필드는 최소화한다.
- 디자인보다 메시지 검증 속도를 우선한다.
- 실패한 실험은 삭제보다 비활성화로 관리한다.
- 운영 초기에는 `Supabase Dashboard`로 조회하고, 필요 시 admin UI를 붙인다.

## MVP 결론

이 프로젝트의 첫 버전은 아래 범위로 시작하는 것이 가장 현실적이다.

- 하나의 공통 랜딩 템플릿
- 여러 `slug` 지원
- 자체 폼 입력
- 서버를 통한 `Supabase` 저장
- `/thanks` 페이지
- UTM 저장
- 기본 전환 분석
- `Vercel` 자동 배포

이 범위만 갖춰도 아이디어 검증용 랜딩을 빠르게 복제하고, 실제 전환 데이터를 직접 축적하는 운영이 가능하다.
