/**
 * Stark Lab 8本柱サービス定義
 * 個別LP / SEO / Entity / 内部リンクの単一ソース
 */

export type ServiceSection = {
  step: string;
  title: string;
  body: string;
};

export type ServiceDefinition = {
  slug: string;
  /** 旧 /services#id との互換 */
  legacyAnchor?: string;
  title: string;
  shortTitle: string;
  summary: string;
  seo: { title: string; description: string };
  whatIs: string;
  problems: string[];
  whoFor: string[];
  capabilities: string[];
  examples: string[];
  howWeHelp: string;
  process: ServiceSection[];
  pricingNote: string;
  faqs: { question: string; answer: string }[];
  ctaLabel: string;
  contactTopic: string;
  relatedServiceSlugs: string[];
  relatedIndustrySlugs: string[];
  relatedWorkSlugs?: string[];
};

export const serviceDefinitions: ServiceDefinition[] = [
  {
    slug: "web-development",
    legacyAnchor: "homepage",
    title: "Web Development",
    shortTitle: "Web制作",
    summary:
      "コーポレート・LP・採用サイトを、SEO・CV・AI検索を意識した情報設計で制作します。",
    seo: {
      title: "Web制作・サイト開発",
      description:
        "コーポレートサイト、LP、採用サイトの制作。SEO設計、構造化データ、GA4、CV改善、AI検索を意識した情報設計まで。Stark LabのWeb Development。",
    },
    whatIs:
      "Web Developmentは、企業の公式サイト・サービスサイト・LPを「見た目だけ」ではなく、集客・問い合わせ・信頼形成まで設計して制作するサービスです。",
    problems: [
      "サイトはあるが問い合わせが増えない",
      "SEOや計測の設計が後回しになっている",
      "デザインとシステム・AIが別ベンダーで分断されている",
      "AI検索や検索エンジンに正しく理解される情報構造がない",
    ],
    whoFor: [
      "コーポレートサイトを刷新したい企業",
      "LP・採用サイトを新規制作したい企業",
      "Webとシステム・AIを一体で進めたい企業",
    ],
    capabilities: [
      "コーポレートサイト・サービスサイト",
      "LP・採用サイト",
      "UI/UX設計",
      "SEO設計・内部リンク",
      "GA4 / Search Console 設定",
      "構造化データ（Schema.org）",
      "CV導線・フォーム設計",
      "AI検索を意識した情報設計",
    ],
    examples: [
      "建設業向けコーポレート＋問い合わせ導線の再設計",
      "製造業の技術訴求と製品情報の整理",
      "サービス業のLP＋予約・問い合わせ導線",
    ],
    howWeHelp:
      "ヒアリングから情報設計・デザイン・実装・公開後の計測まで一気通貫で支援します。システム開発・AI導入と並行する場合も、同じチームで設計します。",
    process: [
      { step: "01", title: "ヒアリング", body: "目的・ターゲット・既存課題を整理します。" },
      { step: "02", title: "情報設計", body: "ページ構成、SEO、CV導線を設計します。" },
      { step: "03", title: "制作・実装", body: "デザインと実装を進め、計測基盤を組み込みます。" },
      { step: "04", title: "公開・改善", body: "公開後の計測と改善サイクルを支援します。" },
    ],
    pricingNote:
      "規模・ページ数・機能により異なります。まずは無料相談で必要範囲を整理し、お見積りします。",
    faqs: [
      {
        question: "Web制作だけの依頼は可能ですか？",
        answer: "可能です。サイト制作のみ、SEO設計のみなど、必要な範囲から始められます。",
      },
      {
        question: "SEOやGA4も含めて依頼できますか？",
        answer: "含めて対応します。公開時から計測・検索の基盤を組み込む設計を推奨しています。",
      },
    ],
    ctaLabel: "Web制作について相談",
    contactTopic: "web-development",
    relatedServiceSlugs: ["seo-ai-search", "dx-consulting", "data-dashboard"],
    relatedIndustrySlugs: ["construction", "manufacturing", "service-business"],
    relatedWorkSlugs: ["stark-lab"],
  },
  {
    slug: "system-development",
    legacyAnchor: "system",
    title: "System Development",
    shortTitle: "システム開発",
    summary:
      "顧客・案件・工程・見積・日報・図面・在庫など、業務フローに合わせたシステムを設計・開発します。",
    seo: {
      title: "業務システム開発",
      description:
        "顧客管理、案件管理、工程管理、見積、日報、図面、在庫、社内ポータル、Dashboard、API連携。業務に合わせたシステム開発。",
    },
    whatIs:
      "System Developmentは、Excel・紙・メールに散らばった業務を、現場で使えるWebシステム・管理画面・社内ツールとして実装するサービスです。",
    problems: [
      "業務が表計算とチャットに分散している",
      "既存SaaSが業務フローと合わない",
      "現場と事務所の情報がつながっていない",
      "API連携やデータ統合ができていない",
    ],
    whoFor: [
      "業務システムを新規開発したい企業",
      "既存ツールを統合・置き換えしたい企業",
      "現場向けの入力・確認フローを整えたい企業",
    ],
    capabilities: [
      "顧客・案件管理",
      "工程・日報・見積管理",
      "写真・図面管理",
      "在庫・社内ポータル",
      "Dashboard・API連携",
      "権限設計・通知設計",
    ],
    examples: [
      "建設現場の情報を集約する現場管理システム（KENBEI）",
      "図面・PDFの版管理と検索（DrawStock）",
      "営業・案件の進捗を可視化する社内ツール",
    ],
    howWeHelp:
      "業務ヒアリングから設計・開発・導入まで伴走します。Webサイト・AI・データ可視化と組み合わせた全体設計も可能です。",
    process: [
      { step: "01", title: "業務整理", body: "現状フローと課題を可視化します。" },
      { step: "02", title: "設計", body: "画面・データ・権限・連携を設計します。" },
      { step: "03", title: "開発", body: "段階的に実装し、現場で試せる形にします。" },
      { step: "04", title: "導入・改善", body: "運用定着と改善を支援します。" },
    ],
    pricingNote: "機能範囲・連携要件により異なります。PoCから段階導入も可能です。",
    faqs: [
      {
        question: "既存システムと連携できますか？",
        answer: "API連携やデータ移行を含めて検討します。まずは現状のツール構成をヒアリングします。",
      },
      {
        question: "小規模から始められますか？",
        answer: "可能です。まず1業務・1画面から始め、効果を見ながら拡張する進め方も多いです。",
      },
    ],
    ctaLabel: "業務システムについて相談",
    contactTopic: "system-development",
    relatedServiceSlugs: ["data-dashboard", "ai-automation", "dx-consulting"],
    relatedIndustrySlugs: ["construction", "manufacturing", "small-business"],
    relatedWorkSlugs: ["kenbei", "drawstock"],
  },
  {
    slug: "ai-automation",
    legacyAnchor: "ai",
    title: "AI Automation",
    shortTitle: "AI自動化",
    summary:
      "問い合わせ対応、文書・報告書・議事録生成、定型業務の自動化など、現場で使えるAI活用を設計します。",
    seo: {
      title: "AI自動化・業務効率化",
      description:
        "問い合わせ対応、文書生成、議事録、メール、報告書、データ整理、定型業務自動化、FAQ AI。現場で使えるAI Automation。",
    },
    whatIs:
      "AI Automationは、生成AIや自動化ツールを、実際の業務フローに組み込み、手作業を減らすサービスです。ツール導入だけで終わらせず、運用まで設計します。",
    problems: [
      "AIを試したが現場で定着しない",
      "報告書・メール・議事録の作成に時間がかかる",
      "問い合わせ対応が属人化している",
      "定型業務が人手に依存している",
    ],
    whoFor: [
      "AIを業務に落とし込みたい企業",
      "事務・報告・問い合わせ業務を効率化したい企業",
      "まず小さくPoCから始めたい企業",
    ],
    capabilities: [
      "問い合わせ対応の半自動化",
      "文書・報告書・議事録生成",
      "メール作成支援",
      "データ整理・分類",
      "FAQ AI",
      "定型業務のワークフロー自動化",
    ],
    examples: [
      "日報・報告書のたたき台生成と確認フロー",
      "問い合わせ内容の分類と担当振り分け支援",
      "社内FAQの整備と回答支援",
    ],
    howWeHelp:
      "業務を分解し、AIが担える部分と人が確認すべき部分を明確にして実装します。System Development・RAGと組み合わせた設計も行います。",
    process: [
      { step: "01", title: "業務分解", body: "自動化候補とリスクを整理します。" },
      { step: "02", title: "PoC", body: "小さく試し、現場フィードバックを得ます。" },
      { step: "03", title: "実装", body: "ワークフローと権限を含めて組み込みます。" },
      { step: "04", title: "定着支援", body: "運用ルールと改善サイクルを設計します。" },
    ],
    pricingNote: "対象業務・連携範囲により異なります。PoC単体のご相談も可能です。",
    faqs: [
      {
        question: "ChatGPTを入れるだけの支援ですか？",
        answer:
          "いいえ。業務フロー・権限・データ連携まで含め、現場で使える形に落とし込む支援です。",
      },
      {
        question: "小規模企業でも導入できますか？",
        answer: "可能です。まず1業務から始める設計を推奨しています。",
      },
    ],
    ctaLabel: "AI自動化について相談",
    contactTopic: "ai-automation",
    relatedServiceSlugs: ["ai-agent", "rag", "dx-consulting"],
    relatedIndustrySlugs: ["small-business", "service-business", "construction"],
  },
  {
    slug: "ai-agent",
    title: "AI Agent Development",
    shortTitle: "AIエージェント",
    summary:
      "認識→検索→判断→実行→記録まで行う業務AIエージェントを、LLM・API・DB・ワークフローで実装します。",
    seo: {
      title: "AIエージェント開発",
      description:
        "業務AIエージェントの設計・開発。LLM + API + Database + Workflow。単なるChatGPT導入ではなく、業務に組み込む実装。",
    },
    whatIs:
      "AI Agent Developmentは、AIが業務の一連のステップ（認識・検索・判断・実行・記録）を担えるよう、LLM・API・データベース・業務ワークフローを統合して実装するサービスです。",
    problems: [
      "AIが回答するだけで、業務が進まない",
      "社内データやAPIとつながっていない",
      "誰が何をしたか記録・監査ができない",
      "単発のプロンプト運用で属人化している",
    ],
    whoFor: [
      "業務プロセス全体をAIで支援したい企業",
      "API・DBと連携したAI活用を検討している企業",
      "RAGや自動化と組み合わせたい企業",
    ],
    capabilities: [
      "業務ステップの分解とエージェント設計",
      "LLM + API + DB 連携",
      "ワークフロー・権限・ログ設計",
      "人の確認を挟む安全な自動化",
      "既存システムとの統合",
    ],
    examples: [
      "問い合わせ受付から担当振り分けまでのエージェント",
      "社内ナレッジ検索後に定型処理を実行するフロー",
      "報告書生成から承認フローまでの半自動化",
    ],
    howWeHelp:
      "「何を自動化し、何を人が判断するか」を明確にし、実装可能な範囲から段階的に構築します。未検証の技術を実績として謳いません。",
    process: [
      { step: "01", title: "業務マッピング", body: "エージェントが担うステップを定義します。" },
      { step: "02", title: "設計", body: "API・データ・権限・ログを設計します。" },
      { step: "03", title: "PoC・開発", body: "小さく動く形を作り、拡張します。" },
      { step: "04", title: "運用設計", body: "監査・改善・エラー時の手順を整えます。" },
    ],
    pricingNote: "業務範囲・連携数により異なります。PoCからの段階導入を推奨します。",
    faqs: [
      {
        question: "ChatGPT導入支援との違いは何ですか？",
        answer:
          "業務ワークフローとシステム連携まで含め、エージェントとして動く仕組みを開発します。",
      },
      {
        question: "既存のRAGやシステムと組み合わせられますか？",
        answer: "可能です。RAG・System Developmentと一体で設計することが多いです。",
      },
    ],
    ctaLabel: "AIエージェント導入について相談",
    contactTopic: "ai-agent",
    relatedServiceSlugs: ["rag", "ai-automation", "system-development"],
    relatedIndustrySlugs: ["manufacturing", "construction", "small-business"],
  },
  {
    slug: "rag",
    title: "RAG / Knowledge AI",
    shortTitle: "RAG・ナレッジAI",
    summary:
      "PDF・マニュアル・図面・社内規定・技術資料などを、AIが検索・回答できるナレッジ基盤として実装します。",
    seo: {
      title: "RAG・ナレッジAI",
      description:
        "社内PDF、マニュアル、図面、技術資料、FAQをAIで検索・回答。RAG / Knowledge AIの設計・開発。",
    },
    whatIs:
      "RAG / Knowledge AIは、企業内の文書・資料・過去案件の知見をAIが参照し、検索・回答できるようにする仕組みです。",
    problems: [
      "必要な資料がどこにあるか分からない",
      "マニュアルが更新されず現場と乖離している",
      "ベテランの知識が属人化している",
      "図面・技術資料の検索に時間がかかる",
    ],
    whoFor: [
      "社内ナレッジをAI活用したい企業",
      "製造業・建設業など資料が多い企業",
      "FAQ・サポート業務を効率化したい企業",
    ],
    capabilities: [
      "PDF・マニュアル・規定の取り込み",
      "図面・技術資料の検索基盤",
      "FAQ・営業資料のナレッジ化",
      "権限付きアクセス設計",
      "既存システムとの連携",
    ],
    examples: [
      "図面・PDFライブラリと連携する検索（DrawStock連携想定）",
      "製造業の技術資料・作業手順の検索支援",
      "社内規定・安全資料のナレッジベース",
    ],
    howWeHelp:
      "データの所在・更新ルール・権限を整理し、検索精度と運用性を両立する設計で実装します。",
    process: [
      { step: "01", title: "資料整理", body: "対象データと更新ルールを定義します。" },
      { step: "02", title: "設計", body: "インデックス・権限・UIを設計します。" },
      { step: "03", title: "実装", body: "RAGパイプラインと検索UIを構築します。" },
      { step: "04", title: "改善", body: "精度・運用フィードバックで改善します。" },
    ],
    pricingNote: "データ量・連携・権限要件により異なります。",
    faqs: [
      {
        question: "社内PDFをAIに検索させられますか？",
        answer:
          "可能です。権限設計と更新ルールを含めて、検索・回答できる形に整えます。",
      },
      {
        question: "図面や技術資料にも対応できますか？",
        answer:
          "対応可能領域です。ファイル形式・検索要件をヒアリングのうえ設計します。",
      },
    ],
    ctaLabel: "ナレッジAIについて相談",
    contactTopic: "rag",
    relatedServiceSlugs: ["ai-agent", "system-development", "data-dashboard"],
    relatedIndustrySlugs: ["manufacturing", "construction"],
    relatedWorkSlugs: ["drawstock"],
  },
  {
    slug: "data-dashboard",
    title: "Data / Dashboard",
    shortTitle: "データ・Dashboard",
    summary:
      "売上・案件・工程・在庫・問い合わせ・Web解析を可視化し、意思決定できる状態にするサービスです。",
    seo: {
      title: "データ可視化・Dashboard開発",
      description:
        "売上、案件、KPI、工程、在庫、生産、問い合わせ、Web解析、AI分析。データを集め、意思決定できるDashboardを構築。",
    },
    whatIs:
      "Data / Dashboardは、散在するデータを集約し、経営・現場が「見て判断できる」状態にするサービスです。集めるだけでなく、意思決定に使える指標設計まで含みます。",
    problems: [
      "データはあるが見える化されていない",
      "Excel集計に毎週時間がかかる",
      "現場と経営で見ている数字が違う",
      "Web・問い合わせ・業務データがつながっていない",
    ],
    whoFor: [
      "KPI・進捗を一目で把握したい企業",
      "複数ツールのデータを統合したい企業",
      "DX推進の効果を測りたい企業",
    ],
    capabilities: [
      "売上・案件・KPI可視化",
      "工程・在庫・生産ダッシュボード",
      "問い合わせ・Web解析の統合",
      "AI分析結果の表示",
      "経営・現場向けビュー設計",
    ],
    examples: [
      "案件進捗と問い合わせ数を並べた経営ビュー",
      "現場の日報・工程データの可視化",
      "Web流入とリードのつながりを見るレポート",
    ],
    howWeHelp:
      "指標の定義からデータ連携・画面設計まで支援します。System Development・SEO/AI Search Growthと連携した設計が可能です。",
    process: [
      { step: "01", title: "指標設計", body: "何を判断材料にするかを定義します。" },
      { step: "02", title: "データ連携", body: "ソースと更新頻度を設計します。" },
      { step: "03", title: "Dashboard構築", body: "役割別のビューを実装します。" },
      { step: "04", title: "運用改善", body: "見る習慣と改善サイクルを支援します。" },
    ],
    pricingNote: "データソース数・指標・更新頻度により異なります。",
    faqs: [
      {
        question: "既存のExcelデータから始められますか？",
        answer: "可能です。まずはExcel・CSVから始め、段階的にシステム連携へ拡張できます。",
      },
      {
        question: "GA4や問い合わせデータも含められますか？",
        answer: "含められます。Web・リード・業務データを横断する設計も対応可能です。",
      },
    ],
    ctaLabel: "データ活用について相談",
    contactTopic: "data-dashboard",
    relatedServiceSlugs: ["system-development", "seo-ai-search", "dx-consulting"],
    relatedIndustrySlugs: ["manufacturing", "construction", "small-business"],
  },
  {
    slug: "seo-ai-search",
    legacyAnchor: "seo",
    title: "SEO / AI Search Growth",
    shortTitle: "SEO・AI検索",
    summary:
      "Google検索・AI検索・コンテンツ・CV改善を統合し、発見から問い合わせまでつなぐ成長基盤を構築します。",
    seo: {
      title: "SEO・AI検索・コンテンツ成長",
      description:
        "Technical SEO、Content SEO、Search Console、GA4、構造化データ、Entity設計、Topic Cluster、CVR改善。検索・AI・コンテンツを問い合わせにつなげる。",
    },
    whatIs:
      "SEO / AI Search Growthは、検索エンジンとAIが企業情報を理解しやすい構造を整え、コンテンツとCV導線で問い合わせにつなげるサービスです。記事代行だけではありません。",
    problems: [
      "検索流入が伸びない・記事が成果に結びつかない",
      "サイト構造・内部リンクが弱い",
      "AI検索で何を書けばよいか分からない",
      "計測と改善サイクルが回っていない",
    ],
    whoFor: [
      "検索・AI経由の集客を強化したい企業",
      "コンテンツとCVを一体で改善したい企業",
      "自社メディアを育てたい企業",
    ],
    capabilities: [
      "Technical SEO・クロール設計",
      "Content SEO・Topic Cluster",
      "Search Console・GA4",
      "構造化データ・Entity設計",
      "内部リンク・CVR改善",
      "AI検索を意識した情報構造",
      "記事改善・メディア運用支援",
    ],
    examples: [
      "建設業向けメディアとサービスページのクラスター設計",
      "製造業の技術訴求とナレッジ記事の連携",
      "stark-seo-engine連携による計測・改善ループ",
    ],
    howWeHelp:
      "サイト構造・コンテンツ・計測・CVを一体で設計します。AIに必ず引用される保証はできませんが、理解しやすい情報設計を重視します。",
    process: [
      { step: "01", title: "現状診断", body: "技術SEO・コンテンツ・計測を確認します。" },
      { step: "02", title: "設計", body: "Entity・クラスター・CV導線を設計します。" },
      { step: "03", title: "実装", body: "サイト・コンテンツ・計測を整備します。" },
      { step: "04", title: "改善", body: "データを見ながら継続改善します。" },
    ],
    pricingNote: "サイト規模・コンテンツ範囲により異なります。",
    faqs: [
      {
        question: "AI検索に必ず載るようになりますか？",
        answer:
          "保証はできません。検索エンジン・AIが理解しやすい情報構造と、継続的なコンテンツ改善を支援します。",
      },
      {
        question: "記事作成だけの依頼も可能ですか？",
        answer:
          "可能ですが、サイト構造・CV・計測とセットで進める方が成果につながりやすいです。",
      },
    ],
    ctaLabel: "検索・AI流入について相談",
    contactTopic: "seo-ai-search",
    relatedServiceSlugs: ["web-development", "dx-consulting", "data-dashboard"],
    relatedIndustrySlugs: ["construction", "manufacturing", "service-business"],
    relatedWorkSlugs: ["stark-lab"],
  },
  {
    slug: "dx-consulting",
    title: "DX Consulting",
    shortTitle: "DXコンサル",
    summary:
      "業務ヒアリングからAI/DX候補抽出、ROI検討、PoC、開発、導入、改善まで伴走するコンサルティングです。",
    seo: {
      title: "DXコンサルティング",
      description:
        "現状業務の整理、AI/DX候補抽出、ROI評価、PoC、開発、導入、改善まで。Stark LabのDX Consulting。",
    },
    whatIs:
      "DX Consultingは、いきなり開発に入るのではなく、業務・課題・投資対効果を整理し、Web・AI・システム・データのどこから手を付けるべきかを一緒に決めるサービスです。",
    problems: [
      "DXの優先順位が分からない",
      "ベンダーごとに提案がバラバラ",
      "PoCが終わって本番化できない",
      "現場が使わないシステムが増える",
    ],
    whoFor: [
      "DX・AIの全体像を整理したい企業",
      "複数施策の優先順位を決めたい企業",
      "開発前にROIを検討したい企業",
    ],
    capabilities: [
      "現状業務ヒアリング",
      "課題整理・DX候補抽出",
      "ROI・優先順位の検討",
      "PoC設計・支援",
      "開発・導入の伴走",
      "改善サイクルの設計",
    ],
    examples: [
      "建設業の現場DXと図面管理の優先順位整理",
      "製造業のナレッジAIとDashboardの段階導入計画",
      "中小企業のExcel業務からシステム化へのロードマップ",
    ],
    howWeHelp:
      "コンサルで終わらせず、必要ならStark Labが開発まで担当します。何でも屋ではなく、Web・AI・System・Dataの実装力で伴走します。",
    process: [
      { step: "01", title: "ヒアリング", body: "業務・課題・データの現状を整理します。" },
      { step: "02", title: "候補抽出", body: "AI/DX施策と優先順位を提案します。" },
      { step: "03", title: "PoC・開発", body: "合意した範囲で実装を進めます。" },
      { step: "04", title: "定着・改善", body: "運用と次の打ち手を設計します。" },
    ],
    pricingNote: "支援範囲により異なります。まずは無料相談から可能です。",
    faqs: [
      {
        question: "コンサルだけの依頼は可能ですか？",
        answer: "可能です。整理・優先順位付けのみの支援も行います。",
      },
      {
        question: "開発は別会社に依頼する場合も相談できますか？",
        answer: "可能です。要件整理・設計レビューの支援も行います。",
      },
    ],
    ctaLabel: "DXについて相談",
    contactTopic: "dx-consulting",
    relatedServiceSlugs: [
      "web-development",
      "system-development",
      "ai-automation",
      "seo-ai-search",
    ],
    relatedIndustrySlugs: [
      "construction",
      "manufacturing",
      "small-business",
      "real-estate",
      "service-business",
    ],
  },
];

export function getAllServices(): ServiceDefinition[] {
  return serviceDefinitions;
}

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return serviceDefinitions.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return serviceDefinitions.map((s) => s.slug);
}

export function getServiceByLegacyAnchor(anchor: string): ServiceDefinition | undefined {
  return serviceDefinitions.find((s) => s.legacyAnchor === anchor || s.slug === anchor);
}
