import{S as H,i as V,s as W,e as f,t as S,c as m,a as v,h as I,d as c,f as $,g as R,K as l,j as z,k as U,X,m as q,b,I as Y,O as F,P as J,M as A,v as L,Y as Q,V as Z,W as K}from"../chunks/vendor-37e7558d.js";import{b as ee,g as te,u as M}from"../chunks/requestUtils-be5283f7.js";import{n as N,B as O}from"../chunks/constants-3794c139.js";import"../chunks/singletons-a6a7384f.js";const{document:x}=Q;function G(u){let a,s=u[0].username+"",t,i;return{c(){a=f("span"),t=S(s),i=S(","),this.h()},l(e){a=m(e,"SPAN",{style:!0});var r=v(a);t=I(r,s),i=I(r,","),r.forEach(c),this.h()},h(){$(a,"text-transform","capitalize")},m(e,r){R(e,a,r),l(a,t),l(a,i)},p(e,r){r&1&&s!==(s=e[0].username+"")&&z(t,s)},d(e){e&&c(a)}}}function se(u){let a,s,t,i,e,r,y,d,B,C,E,j,D,k,p,g,n=u[0].username&&G(u);return{c(){a=U(),s=f("section"),t=f("h1"),i=f("div"),e=f("picture"),r=f("source"),y=U(),d=f("img"),C=U(),n&&n.c(),E=S(`

		to our new`),j=f("br"),D=S("SvelteKit app"),this.h()},l(o){X('[data-svelte="svelte-1anpopb"]',x.head).forEach(c),a=q(o),s=m(o,"SECTION",{});var P=v(s);t=m(P,"H1",{});var _=v(t);i=m(_,"DIV",{class:!0});var T=v(i);e=m(T,"PICTURE",{});var w=v(e);r=m(w,"SOURCE",{srcset:!0,type:!0}),y=q(w),d=m(w,"IMG",{src:!0,alt:!0}),w.forEach(c),T.forEach(c),C=q(_),n&&n.l(_),E=I(_,`

		to our new`),j=m(_,"BR",{}),D=I(_,"SvelteKit app"),_.forEach(c),P.forEach(c),this.h()},h(){x.title="Home",b(r,"srcset","svelte-welcome.webp"),b(r,"type","image/webp"),Y(d.src,B="svelte-welcome.png")||b(d,"src",B),b(d,"alt","Welcome"),b(i,"class","welcome")},m(o,h){R(o,a,h),R(o,s,h),l(s,t),l(t,i),l(i,e),l(e,r),l(e,y),l(e,d),l(t,C),n&&n.m(t,null),l(t,E),l(t,j),l(t,D),g=!0},p(o,[h]){o[0].username?n?n.p(o,h):(n=G(o),n.c(),n.m(t,E)):n&&(n.d(1),n=null)},i(o){g||(F(()=>{p&&p.end(1),k=Z(s,K,{y:-100,duration:500,delay:500}),k.start()}),g=!0)},o(o){k&&k.invalidate(),p=J(s,K,{duration:500}),g=!1},d(o){o&&c(a),o&&c(s),n&&n.d(),o&&p&&p.end()}}}function ae(u,a,s){let t,i;return A(u,N,e=>s(1,t=e)),A(u,M,e=>s(0,i=e)),L(async()=>{if(ee("refreshToken")){const[r,y]=await te(fetch,`${O}/token/refresh/`,`${O}/user/`);M.set(r)}const e=document.getElementsByClassName("notification");e&&t!==""&&setTimeout(()=>{e.display="none",N.set("")},5e3)}),[i]}class le extends H{constructor(a){super();V(this,a,ae,se,W,{})}}export{le as default};
