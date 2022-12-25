"use strict";(self.webpackChunkscoolzee=self.webpackChunkscoolzee||[]).push([[869],{4884:function(e,t,n){n.r(t),n.d(t,{default:function(){return y}});var o=n(4165),r=n(5861),i=n(885),a=n(2791),s=n(1288),l=n(1971),d=n(272),c=n(6869),u=n(8302),p=n(6513),h=n(8455),x=n(1897),g=n(9271),v=n(6140),m=n.p+"static/media/loginCard.1a779a4bd5495fadde60.jpg",f=n(4942),b=(0,n(8596).Z)((function(e){return{container:{padding:"10px"},form:{padding:"20% 30px 30px 30px",height:"100vh",width:"80%",margin:"20px auto"},leftGrid:(0,f.Z)({width:"60%"},e.breakpoints.down("sm"),{display:"none"}),rightGrid:(0,f.Z)({width:"40%"},e.breakpoints.down("sm"),{width:"100%"}),input:{padding:"5px 0px 5px 0px"},checkbox:{padding:"5px 0px 5px 8px"},button:{padding:"10px 0px 5px 0px"},centerScreen:{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",minHeight:"100vh"},modalWidth:(0,f.Z)({background:"#fff",textAlign:"center",marginBottom:"30px",borderRadius:"3px",boxShadow:"0 10px 30px rgb(0 0 0 / 10%)",width:"30%",height:"50vh"},e.breakpoints.down("sm"),{width:"auto"})}})),Z=n(4569),S=n.n(Z),j=n(5048),w=n(3974),k=n(184),y=function(){var e=(0,g.k6)(),t=b(),n=(0,a.useState)(!1),f=(0,i.Z)(n,2),Z=f[0],y=f[1],C=(0,a.useState)(!1),I=(0,i.Z)(C,2),N=I[0],P=(I[1],(0,a.useState)("")),E=(0,i.Z)(P,2),T=E[0],W=E[1],z=(0,a.useState)(""),D=(0,i.Z)(z,2),F=D[0],L=D[1],A=(0,a.useState)(""),B=(0,i.Z)(A,2),G=B[0],V=B[1],R=(0,a.useState)(""),H=(0,i.Z)(R,2),q=H[0],J=H[1],M=(0,a.useContext)(w.v),O=(0,i.Z)(M,2),$=(O[0],O[1]),K=function(){var t=(0,r.Z)((0,o.Z)().mark((function t(){var n,r,i,a,s,l,d,c,u,p,h,x,g,m,f;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(T&&T.target.value.match(/\S+@\S+\.\S+/)?V(""):V("Email is invalid"),F&&null!==(n=F.target)&&void 0!==n&&n.value?J(""):J("Password is invalid"),null===(r=T.target)||void 0===r||!r.value.match(/\S+@\S+\.\S+/)||null===(i=F.target)||void 0===i||!i.value){t.next=19;break}return t.prev=3,y(!0),t.next=7,S().post("".concat("http://localhost:8000/web","/login"),{email:null===(a=T.target)||void 0===a?void 0:a.value,userPassword:null===(s=F.target)||void 0===s?void 0:s.value});case 7:l=t.sent,d=l.data,console.log(d),d.passwordError?J(d.passwordError):d.emailError?V(d.emailError):($(!0),localStorage.setItem("userDetail",JSON.stringify(d.user)),localStorage.setItem("userToken",d.token),localStorage.setItem("activeSubscription",d.activeSubscription),localStorage.setItem("subscribedProd",d.subscribedProd),p=!0===d.activeSubscription?"/dashboard":"Admin"===(null===(c=d.user)||void 0===c||null===(u=c.profile)||void 0===u?void 0:u.name)?"/setup/billing-details":function(){return localStorage.removeItem("userDetail"),localStorage.removeItem("userToken"),localStorage.removeItem("activeSubscription"),localStorage.removeItem("subscribedProd"),$(!1),e.go(0),"/login"},e.replace(p)),y(!1),t.next=19;break;case 14:t.prev=14,t.t0=t.catch(3),400!==(null===(h=t.t0.response)||void 0===h?void 0:h.status)&&502!==(null===(x=t.t0.response)||void 0===x?void 0:x.status)||console.log(t.t0),403===(null===(g=t.t0.response)||void 0===g?void 0:g.status)&&"inactive"===(null===(m=t.t0.response)||void 0===m||null===(f=m.data)||void 0===f?void 0:f.error)&&v.ZP.error("temporarily unable to login. Please contact your administrator"),y(!1);case 19:case"end":return t.stop()}}),t,null,[[3,14]])})));return function(){return t.apply(this,arguments)}}();return N?(0,k.jsxs)(l.Z,{style:{paddingTop:"50%",backgroundColor:"white"},children:[(0,k.jsx)(j.Z,{isPageLoading:Z}),(0,k.jsx)(v.x7,{})]}):Z?(0,k.jsxs)(l.Z,{style:{top:"50%"},children:[(0,k.jsx)(j.Z,{isPageLoading:Z}),(0,k.jsx)(v.x7,{})]}):(0,k.jsxs)(l.Z,{sx:{flexGrow:1},children:[(0,k.jsxs)(s.Z,{container:!0,children:[(0,k.jsx)(s.Z,{item:!0,className:t.leftGrid,children:(0,k.jsx)("img",{width:"100%",height:"100%",alt:"Login",src:m})}),(0,k.jsx)(s.Z,{item:!0,className:t.rightGrid,children:(0,k.jsx)(s.Z,{children:(0,k.jsxs)("div",{elevation:10,className:t.form,children:[(0,k.jsxs)(s.Z,{align:"center",children:[(0,k.jsx)(d.Z,{style:{backgroundColor:"green"},children:(0,k.jsx)(x.Z,{})}),(0,k.jsx)("h2",{children:"Log In"})]}),(0,k.jsx)("div",{className:t.input,children:(0,k.jsx)(c.Z,{label:"Email Id",onFocus:function(){V("")},placeholder:"Enter Email Id",fullWidth:!0,required:!0,helperText:""===G?"":(0,k.jsx)(u.Z,{style:{color:"red",fontSize:"0.75rem",fontWeight:400},children:G}),onChange:function(e){W(e)}})}),(0,k.jsx)("div",{className:t.input,children:(0,k.jsx)(c.Z,{label:"Password",onFocus:function(){J("")},placeholder:"Enter Password",fullWidth:!0,required:!0,type:"password",helperText:""===q?"":(0,k.jsx)(u.Z,{style:{color:"red",fontSize:"0.75rem",fontWeight:400},children:q}),onChange:function(e){L(e)}})}),(0,k.jsx)("div",{className:t.button,children:(0,k.jsx)(p.Z,{type:"Submit",color:"primary",variant:"contained",fullWidth:!0,onClick:K,children:"Log In"})}),(0,k.jsx)("div",{style:{paddingleft:"10px"},children:(0,k.jsxs)(u.Z,{children:[" Want to register Institution ?",(0,k.jsx)(h.Z,{style:{padding:"5px",cursor:"pointer"},onClick:function(){e.push("registration")},children:"Register"})]})})]})})})]}),(0,k.jsx)(v.x7,{})]})}},8455:function(e,t,n){var o=n(7462),r=n(5987),i=n(2791),a=n(8182),s=n(1122),l=n(8317),d=n(1175),c=n(9806),u=n(8302),p=i.forwardRef((function(e,t){var n=e.classes,l=e.className,p=e.color,h=void 0===p?"primary":p,x=e.component,g=void 0===x?"a":x,v=e.onBlur,m=e.onFocus,f=e.TypographyClasses,b=e.underline,Z=void 0===b?"hover":b,S=e.variant,j=void 0===S?"inherit":S,w=(0,r.Z)(e,["classes","className","color","component","onBlur","onFocus","TypographyClasses","underline","variant"]),k=(0,d.Z)(),y=k.isFocusVisible,C=k.onBlurVisible,I=k.ref,N=i.useState(!1),P=N[0],E=N[1],T=(0,c.Z)(t,I);return i.createElement(u.Z,(0,o.Z)({className:(0,a.Z)(n.root,n["underline".concat((0,s.Z)(Z))],l,P&&n.focusVisible,"button"===g&&n.button),classes:f,color:h,component:g,onBlur:function(e){P&&(C(),E(!1)),v&&v(e)},onFocus:function(e){y(e)&&E(!0),m&&m(e)},ref:T,variant:j},w))}));t.Z=(0,l.Z)({root:{},underlineNone:{textDecoration:"none"},underlineHover:{textDecoration:"none","&:hover":{textDecoration:"underline"}},underlineAlways:{textDecoration:"underline"},button:{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle","-moz-appearance":"none","-webkit-appearance":"none","&::-moz-focus-inner":{borderStyle:"none"},"&$focusVisible":{outline:"auto"}},focusVisible:{}},{name:"MuiLink"})(p)}}]);
//# sourceMappingURL=869.b43b372a.chunk.js.map