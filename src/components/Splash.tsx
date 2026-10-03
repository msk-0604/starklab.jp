/** 初回表示のときだけ出す、白背景のロゴ動画（セッション中は1回） */
const decideScript = `try{var d=document.documentElement;if(sessionStorage.getItem("starklab-splash")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("splash-off")}else{sessionStorage.setItem("starklab-splash","1")}}catch(e){}`;

// 動画の再生が終わったら（再生できない場合は時間切れで）フェードアウトする
const playScript = `(function(){var d=document.documentElement,v=document.getElementById("splash-video");if(!v)return;if(d.classList.contains("splash-off")){v.pause();return}var done=false;function end(){if(done)return;done=true;d.classList.add("splash-done")}v.addEventListener("ended",function(){setTimeout(end,400)});var srcs=v.querySelectorAll("source");if(srcs.length)srcs[srcs.length-1].addEventListener("error",end);v.addEventListener("error",end);setTimeout(end,6500);var p=v.play();if(p&&p.catch)p.catch(end)})();`;

export function Splash() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: decideScript }} />
      <div className="splash" aria-hidden="true">
        <video
          id="splash-video"
          className="splash-video"
          muted
          playsInline
          autoPlay
          preload="auto"
        >
          <source src="/video/stark-lab-logo.webm" type="video/webm" />
          <source src="/video/stark-lab-logo.mp4" type="video/mp4" />
        </video>
      </div>
      <script dangerouslySetInnerHTML={{ __html: playScript }} />
    </>
  );
}
