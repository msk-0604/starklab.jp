/* eslint-disable @next/next/no-img-element */

/** 初回表示のときだけ出す、白背景のロゴアニメーション（セッション中は1回） */
const splashScript = `try{var d=document.documentElement;if(sessionStorage.getItem("starklab-splash")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("splash-off")}else{sessionStorage.setItem("starklab-splash","1")}}catch(e){}`;

export function Splash() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: splashScript }} />
      <div className="splash" aria-hidden="true">
        <div className="splash-logo">
          <img src="/brand/stark-lab-logo-mark.png" alt="" className="splash-stroke splash-stroke-top" />
          <img src="/brand/stark-lab-logo-mark.png" alt="" className="splash-stroke splash-stroke-bottom" />
        </div>
      </div>
    </>
  );
}
