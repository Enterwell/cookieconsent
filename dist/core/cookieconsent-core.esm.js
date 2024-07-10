/*!
* CookieConsent 3.0.1
* https://github.com/orestbida/cookieconsent
* Author Orest Bida
* Released under the MIT License
*/
import e from'@iabtechlabtcf/stub';import{CmpApi as t}from'@iabtechlabtcf/cmpapi';import{GVL as o,TCModel as n,TCString as s}from'@iabtechlabtcf/core';const a='opt-in',r='opt-out',c='data-category';class i{constructor(){this.t={mode:a,revision:0,autoClearCookies:!0,manageScriptTags:!0,hideFromBots:!0,cookie:{name:'cc_cookie',expiresAfterDays:182,domain:'',path:'/',sameSite:'Lax'}},this.o={i:{},l:'',u:{},p:{},_:{},m:{},C:null,v:!1,S:!1,h:[],D:[],I:[],N:[],T:[],j:[],k:[],A:!1,F:null,L:null,O:null,P:'',R:!0,V:!1,M:!0,G:[],J:!1,U:'',$:!1,B:[],H:[],q:[],K:[],W:!1,X:{},Y:{},Z:{},ee:{},te:{},oe:[]},this.ne={},this.se={ae:'cc:onFirstConsent',re:'cc:onConsent',ce:'cc:onChange'}}}const l=new i,d=()=>{l.o.S||l.o.v||(e(),l.o.v=!0)};window.onload=d;const f=(e,t)=>e.indexOf(t),u=(e,t)=>-1!==f(e,t),p=e=>Array.isArray(e),_=e=>'string'==typeof e,g=e=>!!e&&'object'==typeof e&&!p(e),m=e=>'function'==typeof e,C=e=>Object.keys(e),v=e=>Array.from(new Set(e)),S=e=>{const t=document.createElement(e);return'button'===e&&(t.type=e),t},y=(e,t,o)=>e.setAttribute(t,o),w=(e,t,o)=>{e.removeAttribute(o?'data-'+t:t)},h=(e,t,o)=>e.getAttribute(o?'data-'+t:t),b=e=>{if('object'!=typeof e)return e;if(e instanceof Date)return new Date(e.getTime());let t=Array.isArray(e)?[]:{};for(let o in e){let n=e[o];t[o]=b(n)}return t},D=()=>{const e={},{B:t,X:o,Y:n}=l.o;for(const s of t)e[s]=k(n[s],C(o[s]));return e},I=(e,t)=>{const{B:o,H:n,q:s,ie:a,Z:r,K:c,X:i}=l.o;let d=[];if(e){p(e)?d.push(...e):_(e)&&(d='all'===e?o:[e]);for(const e of o)r[e]=u(d,e)?C(i[e]):[]}else d=[...n,...c];d=d.filter((e=>!u(o,e)||!u(t,e))),d.push(...s),A(d)},N=e=>{const t=l.o,{Z:o,q:n,Y:s,X:a,B:r}=t,c=e?[e]:r;t.te=b(s);for(const e of c){const r=a[e],c=C(r),i=o[e]&&o[e].length>0,l=u(n,e);if(0!==c.length){if(s[e]=[],l)s[e].push(...c);else if(i){const t=o[e];s[e].push(...t)}else s[e]=t.Z[e];s[e]=v(s[e])}}},T=e=>{if(!l.t.isTcfCompliant)return;const{vendors:t}=l.o.C;let o=[];'all'===e?o=t.map((e=>e.id)):p(e)&&(o=e),l.o.T=o},j=()=>{const e=l.t.cookie.expiresAfterDays;return m(e)?e(l.o.U):e},k=(e,t)=>{const o=e||[],n=t||[];return o.filter((e=>!u(n,e))).concat(n.filter((e=>!u(o,e))))},A=e=>{l.o.H=v(e),l.o.U=(()=>{let e='custom';const{H:t,B:o,q:n}=l.o,s=t.length;return s===o.length?e='all':s===n.length&&(e='necessary'),e})()},F=(e,t,o)=>{const{ce:n,re:s,ae:a,le:r,de:c,fe:i}=l.ne,d=l.se,f=l.t.isTcfCompliant,u={cookie:l.o._};e===d.ae?m(a)&&a(b(u)):e===d.re?m(s)&&s(b(u)):(u.changedCategories=l.o.G,u.changedServices=l.o.ee,f&&(u.changedPurposeIds=l.o.D,u.changedSpecialFeatureIds=l.o.N,u.changedVendorIds=l.o.j),m(n)&&n(b(u))),((e,t)=>{dispatchEvent(new CustomEvent(e,{detail:t}))})(e,b(u))},x=(e,t)=>{try{return e()}catch(e){return!t&&console.warn('CookieConsent:',e),!1}},E=e=>{const{Y:t,ee:o,B:n,X:s,oe:a,_:r,G:i}=l.o;for(const e of n){const n=o[e]||t[e]||[];for(const o of n){const n=s[e][o];if(!n)continue;const{onAccept:a,onReject:r}=n;!n.ue&&u(t[e],o)?(n.ue=!0,m(a)&&a()):n.ue&&!u(t[e],o)&&(n.ue=!1,m(r)&&r())}}if(!l.t.manageScriptTags)return;const d=a,f=e||r.categories||[],p=(e,n)=>{if(n>=e.length)return;const s=a[n];if(s.pe)return p(e,n+1);const r=s._e,l=s.ge,d=s.me,_=u(f,l),g=!!d&&u(t[l],d);if(!d&&!s.Ce&&_||!d&&s.Ce&&!_&&u(i,l)||d&&!s.Ce&&g||d&&s.Ce&&!g&&u(o[l]||[],d)){s.pe=!0;const t=h(r,'type',!0);w(r,'type',!!t),w(r,c);let o=h(r,'src',!0);o&&w(r,'src',!0);const a=S('script');a.textContent=r.innerHTML;for(const{nodeName:e}of r.attributes)y(a,e,r[e]||h(r,e));t&&(a.type=t),o?a.src=o:o=r.src;const i=!!o&&(!t||['text/javascript','module'].includes(t));if(i&&(a.onload=a.onerror=()=>{p(e,++n)}),r.replaceWith(a),i)return}p(e,++n)};p(d,0)},L=e=>x((()=>localStorage.removeItem(e)));let O,P;const R=()=>{const{t:e}=l;if(!e.isTcfCompliant)return;if(!ce()||!O||!P)return void P.update('',!0);const t=new n(O);t.isServiceSpecific=!0;const{_:o,C:a}=l.o,r=e.tcfComplianceConfig;t.vendorsDisclosed.set(a.vendorIds),t.vendorConsents.set(o.vendorIds),t.purposeConsents.set(o.purposeIds),t.specialFeatureOptins.set(o.specialFeatureIds),t.useNonStandardTexts=!1,t.cmpId=r.cmpId,t.cmpVersion=r.cmpVersion;const c=s.encode(t);P.update(c,!1)},V=(e,t)=>{if(t instanceof RegExp)return e.filter((e=>t.test(e)));{const o=f(e,t);return o>-1?[e[o]]:[]}},M=()=>{const e=l.t.isTcfCompliant,t=l.o;t.G=l.t.mode===r&&t.R?k(t.K,t.H):k(t.H,t._.categories);let o=t.G.length>0,n=!1;for(const e of t.B)t.ee[e]=k(t.Y[e],t.te[e]),t.ee[e].length>0&&(n=!0);const s=t._.purposeIds??[],c=t._.specialFeatureIds??[],i=t._.vendorIds??[];t.D=k(s,t.h),t.N=k(c,t.I),t.j=k(i,t.T);const d=t.D.length>0,f=t.N.length>0,p=t.j.length>0;t.L||(t.L=new Date),t.P||(t.P=([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)))),t._={categories:b(t.H),revision:l.t.revision,data:t.F,consentTimestamp:t.L.toISOString(),consentId:t.P,services:b(t.Y),...e&&{purposeIds:b(t.h),specialFeatureIds:b(t.I),vendorIds:b(t.T)}};let _=!1;const g=o||n||d||f||p;(t.R||g)&&(t.R&&(t.R=!1,_=!0),t.O=t.O?new Date:t.L,t._.lastConsentTimestamp=t.O.toISOString(),G(),l.t.autoClearCookies&&(_||g)&&(e=>{const t=l.o,o=B(),n=(e=>{const t=l.o;return(e?t.B:t.G).filter((e=>{const o=t.$[e];return!!o&&!o.readOnly&&!!o.autoClear}))})(e);for(const e in t.ee)for(const n of t.ee[e]){const s=t.X[e][n].cookies;if(!u(t.Y[e],n)&&s)for(const e of s){const t=V(o,e.name);J(t,e.path,e.domain)}}for(const s of n){const n=t.$[s].autoClear,a=n&&n.cookies||[],r=u(t.G,s),c=!u(t.H,s),i=r&&c;if(e?c:i){n.reloadPage&&i&&(t.J=!0);for(const e of a){const t=V(o,e.name);J(t,e.path,e.domain)}}}})(_),E(),R()),_&&(F(l.se.ae),F(l.se.re),l.t.mode===a)||(g&&F(l.se.ce),t.J&&(t.J=!1,location.reload()))},G=e=>{const{hostname:t,protocol:o}=location,{name:n,path:s,domain:a,sameSite:r,useLocalStorage:c}=l.t.cookie,i=e?(()=>{const e=l.o.O,t=e?new Date-e:0;return 864e5*j()-t})():864e5*j(),d=new Date;d.setTime(d.getTime()+i),l.o._.expirationTime=d.getTime();const f=JSON.stringify(l.o._);let p=n+'='+encodeURIComponent(f)+(0!==i?'; expires='+d.toUTCString():'')+'; Path='+s+'; SameSite='+r;u(t,'.')&&(p+='; Domain='+a),'https:'===o&&(p+='; Secure'),c?((e,t)=>{x((()=>localStorage.setItem(e,t)))})(n,f):document.cookie=p,l.o._},J=(e,t,o)=>{if(0===e.length)return;const n=o||l.t.cookie.domain,s=t||l.t.cookie.path,a='www.'===n.slice(0,4),r=a&&n.substring(4),c=(e,t)=>{document.cookie=e+'=; path='+s+(t?'; domain=.'+t:'')+'; expires=Thu, 01 Jan 1970 00:00:01 GMT;'};for(const t of e)c(t),c(t,n),a&&c(t,r)},U=e=>{const t=e||l.t.cookie.name,o=l.t.cookie.useLocalStorage;return((e,t)=>{let o;return o=x((()=>JSON.parse(t?e:decodeURIComponent(e))),!0)||{},o})(o?(n=t,x((()=>localStorage.getItem(n)))||''):$(t,!0),o);var n},$=(e,t)=>{const o=document.cookie.match('(^|;)\\s*'+e+'\\s*=\\s*([^;]+)');return o?t?o.pop():e:''},B=e=>{const t=document.cookie.split(/;\s*/),o=[];for(const n of t){let t=n.split('=')[0];e?x((()=>{e.test(t)&&o.push(t)})):o.push(t)}return o},H=(e,t=[],o='all',n='all',s='all')=>{I(e,t),N(),((e,t)=>{if(!l.t.isTcfCompliant)return;const{vendors:o}=l.o.C;let n=[],s=[];if(p(e)&&(n=e),p(t)&&(s=t),'all'===e||'all'===t)for(const a of o)'all'===e&&n.push(...a.purposes),'all'===t&&s.push(...a.specialFeatures);n=v(n),s=v(s),l.o.h=n,l.o.I=s})(o,n),T(s),M()},q=(e,t=[])=>{I(e,t),N(),M()},z=e=>{T(e),M()},K=e=>{const t=l.o.R?[]:l.o.H;return u(t,e)},Q=e=>{const t=l.o.R?[]:l.o.h;return u(t,e)},W=e=>{const t=l.o.R?[]:l.o.I;return u(t,e)},X=e=>{const t=l.o.R?[]:l.o.T;return u(t,e)},Y=(e,t)=>{const{B:o,X:n}=l.o;if(!(e&&t&&_(t)&&u(o,t)&&0!==C(n[t]).length))return!1;q()},Z=(e,t)=>{const o=l.o.R?[]:l.o.Y[t]||[];return u(o,e)},ee=e=>''!==$(e,!0),te=(e,t,o)=>{let n=[];const s=e=>{if(_(e)){let t=$(e);''!==t&&n.push(t)}else n.push(...B(e))};if(p(e))for(let t of e)s(t);else s(e);J(n,t,o)},oe=()=>{const{U:e,Y:t}=l.o,{accepted:o,rejected:n}=(()=>{const{R:e,H:t,B:o}=l.o;return{accepted:t,rejected:e?[]:o.filter((e=>!u(t,e)))}})();return b({acceptType:e,acceptedCategories:o,rejectedCategories:n,acceptedServices:t,rejectedServices:D()})},ne=(e,t)=>{let o=document.querySelector('script[src="'+e+'"]');return new Promise((n=>{if(o)return n(!0);if(o=S('script'),g(t))for(const e in t)y(o,e,t[e]);var s,a;o.onload=()=>n(!0),o.onerror=()=>{o.remove(),n(!1)},o.src=e,s=document.head,a=o,s.appendChild(a)}))},se=e=>{let t,o=e.value,n=e.mode,s=!1;const a=l.o;if('update'===n){a.F=t=ae('data');const e=typeof t==typeof o;if(e&&'object'==typeof t){!t&&(t={});for(let e in o)t[e]!==o[e]&&(t[e]=o[e],s=!0)}else!e&&t||t===o||(t=o,s=!0)}else t=o,s=!0;return s&&(a.F=t,a._.data=t,G(!0)),s},ae=(e,t)=>{const o=U(t);return e?o[e]:o},re=e=>{const t=l.t,o=l.o.i;return e?t[e]||o[e]:{...t,...o,cookie:{...t.cookie}}},ce=()=>!l.o.R,ie=async e=>{const{o:n,t:s,se:a}=l,i=window;if(!i._ccRun){if(i._ccRun=!0,(e=>{const{ve:t,t:o,o:n}=l,s=o,a=n,{cookie:i}=s,d=l.ne,f=e.cookie,p=e.categories,_=C(p)||[],m=navigator,v=document;t.Se=v,i.domain=location.hostname,a.i=e,a.$=p,a.B=_,d.ae=e.onFirstConsent,d.re=e.onConsent,d.ce=e.onChange;const{mode:S,autoClearCookies:y,revision:w,manageScriptTags:b,hideFromBots:D}=e;S===r&&(s.mode=S),'boolean'==typeof y&&(s.autoClearCookies=y),'boolean'==typeof b&&(s.manageScriptTags=b),'number'==typeof w&&w>=0&&(s.revision=w,a.V=!0),!1===D&&(s.hideFromBots=!1),!0===s.hideFromBots&&m&&(a.W=m.userAgent&&/bot|crawl|spider|slurp|teoma/i.test(m.userAgent)||m.webdriver),g(f)&&(s.cookie={...i,...f}),s.autoClearCookies,a.V,s.manageScriptTags,s.isTcfCompliant,s.tcfComplianceConfig,(e=>{const{$:t,X:o,Y:n,Z:s,q:a}=l.o;for(let r of e){const e=t[r],c=e.services||{},i=g(c)&&C(c)||[];o[r]={},n[r]=[],s[r]=[],e.readOnly&&(a.push(r),n[r]=i),l.ve.ye[r]={};for(let e of i){const t=c[e];t.ue=!1,o[r][e]=t}}})(_),(()=>{if(!l.t.manageScriptTags)return;const e=l.o,t=(o=document,n='script['+c+']',o.querySelectorAll(n));var o,n;for(const o of t){let t=h(o,c),n=o.dataset.service||'',s=!1;if(t&&'!'===t.charAt(0)&&(t=t.slice(1),s=!0),'!'===n.charAt(0)&&(n=n.slice(1),s=!0),u(e.B,t)&&(e.oe.push({_e:o,pe:!1,Ce:s,ge:t,me:n}),n)){const o=e.X[t];o[n]||(o[n]={ue:!1})}}})()})(e),n.W)return;if((()=>{const e=l.o,t=l.t,o=U(),{categories:n,services:s,purposeIds:a,specialFeatureIds:c,vendorIds:i,consentId:d,consentTimestamp:f,lastConsentTimestamp:u,data:g,revision:m}=o,C=p(n),v=p(a),S=p(c),y=p(i);e._=o,e.P=d;const w=!!d&&_(d);e.L=f,e.L&&(e.L=new Date(f)),e.O=u,e.O&&(e.O=new Date(u)),e.F=void 0!==g?g:null,e.V&&w&&m!==t.revision&&(e.M=!1),t.isTcfCompliant?e.R=!(w&&e.M&&e.L&&e.O&&C&&v&&S&&y):e.R=!(w&&e.M&&e.L&&e.O&&C),t.cookie.useLocalStorage&&!e.R&&(e.R=(new Date).getTime()>(o.expirationTime||0),e.R&&L(t.cookie.name)),e.R,(()=>{const e=l.o;for(const t of e.B){const o=e.$[t];if(o.readOnly||o.enabled){e.K.push(t);const o=e.X[t]||{};for(let n in o)e.Z[t].push(n),e.i.mode===r&&e.Y[t].push(n)}}})(),e.R?t.mode===r&&(e.H=[...e.K]):(e.Z={...e.Y},e.Y={...e.Y,...s},t.isTcfCompliant&&(e.h=a,e.I=c,e.T=i),A([...e.q,...n]))})(),await(async()=>{const{t:e,o:n}=l;if(!e.isTcfCompliant)return;n.v||d();const{cmpId:s,cmpVersion:a,disclosedVendorIds:r,gvlBaseUrl:c,explicitAcString:i,gvlDefaultFileName:f='vendor-list.json',gvlLanguageFileName:u='vendor-list-[LANG].json'}=e.tcfComplianceConfig??{},p=n.l;try{const e=`${c}/${'en'===p?f:u.replace('[LANG]',p)}`,t=await fetch(e);if(!t.ok)throw new Error(`${t.status}: ${t.statusText}`);const s=await t.json();n.m=s,n.C=(e=>{const t=l.o.m,o=e?.length?e.filter((e=>e in t.vendors)):Object.keys(t.vendors),n=t.purposes,s=t.specialPurposes,a=t.features,r=t.specialFeatures,c=t.stacks,i=Object.values(t.stacks),d=o.map((e=>t.vendors[e])),f=d.map((e=>{const o=e.purposes.map((e=>t.purposes[e])),n=e.legIntPurposes.map((e=>t.purposes[e])),s=e.flexiblePurposes.map((e=>t.purposes[e])),a=e.specialPurposes.map((e=>t.specialPurposes[e])),r=e.features.map((e=>t.features[e])),c=e.specialFeatures.map((e=>t.specialFeatures[e])),i=e.dataDeclaration.map((e=>t.dataCategories[e]));return{...e,purposes:o,legIntPurposes:n,flexiblePurposes:s,specialPurposes:a,features:r,specialFeatures:c,dataDeclaration:i}}));return{originalPurposes:n,originalSpecialPurposes:s,originalFeatures:a,originalSpecialFeatures:r,originalStacks:c,stacks:i,vendors:d,vendorCount:o.length,vendorIds:o,extendedVendors:f}})(r),O=new o(s)}catch(e){console.error('An error occurred while loading the GVL:',e)}P=i?new t(s,a,!0,{getTCData:(e,t,o)=>{'boolean'!=typeof t&&(t.addtlConsent=i),e(t,o)},getInAppTCData:(e,t,o)=>{'boolean'!=typeof t&&(t.addtlConsent=i),e(t,o)}}):new t(s,a,!0),n.S=!0,R()})(),ce())return E(),F(a.re);s.mode===r&&E(n.K)}},le=e=>{const{name:t,path:o,domain:n,useLocalStorage:s}=l.t.cookie;e&&(s?L(t):te(t,o,n));for(const{we:e,he:t,be:o}of l.o.k)e.removeEventListener(t,o);const a=new i;for(const e in l)l[e]=a[e];window._ccRun=!1};export{q as acceptCategory,H as acceptMultiple,Y as acceptService,K as acceptedCategory,Q as acceptedPurpose,Z as acceptedService,W as acceptedSpecialFeature,z as allowVendors,X as allowedVendor,te as eraseCookies,re as getConfig,ae as getCookie,oe as getUserPreferences,ne as loadScript,le as reset,ie as run,se as setCookieData,ce as validConsent,ee as validCookie};
