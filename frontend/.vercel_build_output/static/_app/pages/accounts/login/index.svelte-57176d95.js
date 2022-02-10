import{S as Q,i as $,s as x,e as p,t as L,c as h,a as E,h as N,d,b as u,g as F,K as a,j as ee,k as j,X as te,m as I,Z as q,N as H,_ as se,O as ae,P as ne,$ as re,M as oe,v as le,Y as ie,V as ue,W as Z}from"../../../chunks/vendor-37e7558d.js";import{n as K,g as ce,B as fe}from"../../../chunks/constants-3794c139.js";import{b as de,p as pe,a as he}from"../../../chunks/requestUtils-be5283f7.js";import"../../../chunks/singletons-a6a7384f.js";const{document:z}=ie;function J(c){let o,e;return{c(){o=p("p"),e=L(c[2]),this.h()},l(n){o=h(n,"P",{class:!0});var l=E(o);e=N(l,c[2]),l.forEach(d),this.h()},h(){u(o,"class","center error")},m(n,l){F(n,o,l),a(o,e)},p(n,l){l&4&&ee(e,n[2])},d(n){n&&d(o)}}}function me(c){let o,e,n,l,m,v,i,f,P,t,k,g,A,C,_,G,w,M,R,U,S,B,D,V,r=c[2]&&J(c);return{c(){o=j(),e=p("section"),n=p("h1"),l=L("Login"),m=j(),r&&r.c(),v=j(),i=p("form"),f=p("input"),P=j(),t=p("input"),k=j(),g=p("button"),A=L("Login"),C=j(),_=p("p"),G=L("No account yet? "),w=p("a"),M=L("Get started"),R=L("."),this.h()},l(s){te('[data-svelte="svelte-1bel8ov"]',z.head).forEach(d),o=I(s),e=h(s,"SECTION",{class:!0});var T=E(e);n=h(T,"H1",{});var W=E(n);l=N(W,"Login"),W.forEach(d),m=I(T),r&&r.l(T),v=I(T),i=h(T,"FORM",{class:!0});var b=E(i);f=h(b,"INPUT",{name:!0,type:!0,"aria-label":!0,placeholder:!0}),P=I(b),t=h(b,"INPUT",{name:!0,type:!0,"aria-label":!0,placeholder:!0}),k=I(b),g=h(b,"BUTTON",{class:!0,type:!0});var X=E(g);A=N(X,"Login"),X.forEach(d),C=I(b),_=h(b,"P",{class:!0});var O=E(_);G=N(O,"No account yet? "),w=h(O,"A",{href:!0});var Y=E(w);M=N(Y,"Get started"),Y.forEach(d),R=N(O,"."),O.forEach(d),b.forEach(d),T.forEach(d),this.h()},h(){z.title="Login",u(f,"name","email"),u(f,"type","email"),u(f,"aria-label","Email address"),u(f,"placeholder","Email address"),u(t,"name","password"),u(t,"type","password"),u(t,"aria-label","password"),u(t,"placeholder","password"),u(g,"class","btn"),u(g,"type","submit"),u(w,"href","/accounts/register"),u(_,"class","center"),u(i,"class","form"),u(e,"class","container")},m(s,y){F(s,o,y),F(s,e,y),a(e,n),a(n,l),a(e,m),r&&r.m(e,null),a(e,v),a(e,i),a(i,f),q(f,c[0]),a(i,P),a(i,t),q(t,c[1]),a(i,k),a(i,g),a(g,A),a(i,C),a(i,_),a(_,G),a(_,w),a(w,M),a(_,R),B=!0,D||(V=[H(f,"input",c[4]),H(t,"input",c[5]),H(i,"submit",se(c[3]))],D=!0)},p(s,[y]){s[2]?r?r.p(s,y):(r=J(s),r.c(),r.m(e,v)):r&&(r.d(1),r=null),y&1&&f.value!==s[0]&&q(f,s[0]),y&2&&t.value!==s[1]&&q(t,s[1])},i(s){B||(ae(()=>{S&&S.end(1),U=ue(e,Z,{x:-100,duration:500,delay:500}),U.start()}),B=!0)},o(s){U&&U.invalidate(),S=ne(e,Z,{duration:500}),B=!1},d(s){s&&d(o),s&&d(e),r&&r.d(),s&&S&&S.end(),D=!1,re(V)}}}function _e(c,o,e){let n;oe(c,K,t=>e(6,n=t));let l="",m="",v;const i=async()=>{de("refreshToken")&&localStorage.removeItem("refreshToken");const[t,k]=await pe(fetch,`${fe}/login/`,{user:{email:l,password:m}});k?e(2,v=k):t.user.tokens&&(he("refreshToken",t.user.tokens.refresh),K.set("Login successful."),await ce("/"))};le(()=>{const t=document.getElementsByClassName("notification");t&&n!==""&&setTimeout(()=>{t.display="none",K.set("")},5e3)});function f(){l=this.value,e(0,l)}function P(){m=this.value,e(1,m)}return[l,m,v,i,f,P]}class Ee extends Q{constructor(o){super();$(this,o,_e,me,x,{})}}export{Ee as default};
