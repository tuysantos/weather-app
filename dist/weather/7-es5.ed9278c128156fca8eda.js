!function(){function t(t,a){for(var i=0;i<a.length;i++){var r=a[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,a){if(!(t instanceof a))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{h7uI:function(i,r,o){"use strict";o.r(r),o.d(r,"WeatherComparationModule",(function(){return A}));var n,e,c=o("ofXK"),s=o("tyNb"),d=o("XNiG"),m=o("pLZG"),p=o("1G5W"),l=o("Na/C"),h=o("fXoL"),u=o("NFeN"),b=o("jhN1"),f=o("lqZU"),g=o("dNgK"),x=o("sjoS"),v=o("bTqV"),w=o("R1ws"),y=o("FKr1"),k=["*",[["mat-card-footer"]]],O=["*","mat-card-footer"],F=((e=function t(i){a(this,t),this._animationMode=i}).\u0275fac=function(t){return new(t||e)(h.Jb(w.a,8))},e.\u0275cmp=h.Db({type:e,selectors:[["mat-card"]],hostAttrs:[1,"mat-card","mat-focus-indicator"],hostVars:2,hostBindings:function(t,a){2&t&&h.Bb("_mat-animation-noopable","NoopAnimations"===a._animationMode)},exportAs:["matCard"],ngContentSelectors:O,decls:2,vars:0,template:function(t,a){1&t&&(h.cc(k),h.bc(0),h.bc(1,1))},styles:[".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}._mat-animation-noopable.mat-card{transition:none;animation:none}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child,.mat-card-actions .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}\n"],encapsulation:2,changeDetection:0}),e),S=((n=function t(){a(this,t)}).\u0275mod=h.Hb({type:n}),n.\u0275inj=h.Gb({factory:function(t){return new(t||n)},imports:[[y.c],y.c]}),n),_=o("DgpY"),M=o("Xa2L");function I(t,a){1&t&&(h.Ob(0,"span"),h.rc(1,"Maximum Temperature for each day Highlighted (vertical comparation between places)"),h.Nb())}var j=function(t){return{display:t}};function C(t,a){if(1&t){var i=h.Pb();h.Ob(0,"div",5),h.Ob(1,"button",6),h.Wb("click",(function(){return h.ic(i),h.ac().removeAllItems()})),h.rc(2,"Remove all comparation"),h.Nb(),h.Ob(3,"button",6),h.Wb("click",(function(){return h.ic(i),h.ac().sortForecast()})),h.rc(4,"Sort forecast "),h.Kb(5,"mat-icon",7),h.Kb(6,"mat-icon",8),h.Nb(),h.Ob(7,"button",9),h.Wb("click",(function(){return h.ic(i),h.ac().goBack()})),h.rc(8,"Back"),h.Nb(),h.qc(9,I,2,0,"span",10),h.Nb()}if(2&t){var r=h.ac();h.zb(5),h.dc("ngStyle",h.fc(3,j,r.isSortDesc?"none":"")),h.zb(1),h.dc("ngStyle",h.fc(5,j,r.isSortDesc?"":"none")),h.zb(3),h.dc("ngIf",r.checkForMax)}}function N(t,a){if(1&t&&(h.Ob(0,"mat-card",13),h.Kb(1,"app-weather-forecast-container",14),h.Nb()),2&t){var i=a.$implicit,r=h.ac(2);h.zb(1),h.dc("location",i)("maxWeatherForecats",r.maxWeatherForecats)("checkForMax",r.checkForMax)}}function L(t,a){if(1&t&&(h.Ob(0,"div",11),h.qc(1,N,2,3,"mat-card",12),h.Nb()),2&t){var i=h.ac();h.zb(1),h.dc("ngForOf",i.comparationList)}}function D(t,a){1&t&&h.Kb(0,"mat-spinner",15),2&t&&h.dc("diameter",50)("strokeWidth",2)}var W,z,P,B=[{path:"",component:(W=function(){function i(t,r,o,n,e){a(this,i),this.comparationFacade=o,this.snackBar=n,this.sorterService=e,this.apiState=l.a.Init,this.destroy$=new d.a,this.count=0,this.comparationList=[],this.iMaxIndex=[],this.maxWeatherForecats=[],this.checkForMax=!1,this.isSortDesc=!0,t.addSvgIcon("arrow_down",r.bypassSecurityTrustResourceUrl("assets/img/arrow_down.svg")),t.addSvgIcon("arrow_up",r.bypassSecurityTrustResourceUrl("assets/img/arrow_up.svg"))}var r,o,n;return r=i,(o=[{key:"ngOnInit",value:function(){var t=this;this.comparationFacade.comparation$.pipe(Object(m.a)((function(t){return!!t})),Object(p.a)(this.destroy$)).subscribe((function(a){t.comparationList=a}),(function(a){t.openSnackBar(a.message,"Error")})),this.comparationFacade.apiState$.pipe(Object(m.a)((function(t){return!!t})),Object(p.a)(this.destroy$)).subscribe((function(a){t.apiState=a,a===l.a.Done&&t.sortComparationList()}),(function(a){t.openSnackBar(a.message,"Error")})),this.comparationFacade.count$.pipe(Object(m.a)((function(t){return!!t})),Object(p.a)(this.destroy$)).subscribe((function(a){t.count=a}))}},{key:"sortComparationList",value:function(){var t=[],a=0,i=0;this.comparationList.forEach((function(a){t.push({id:a.woeid,consolidated_weather:a.consolidated_weather})}));var r=[].concat(t);if(r&&r.length>0){for(var o=r[0].consolidated_weather.length,n=0,e=0;e<o;e++){for(var c=0;c<t.length;c++){var s=Math.round(t[c].consolidated_weather[a].max_temp);0===c?n=s:(n<s&&(i=c),n=n>s?n:s)}this.iMaxIndex.push(i),i=0,a++}this.maxTempForecast()}}},{key:"maxTempForecast",value:function(){if(this.comparationList.length>0){this.checkForMax=this.comparationList.length>1;for(var t=this.comparationList[0].consolidated_weather.length,a=0;a<t;a++){var i=this.iMaxIndex[a];this.comparationList[i]&&this.maxWeatherForecats.push(this.comparationList[i].consolidated_weather[a])}}}},{key:"removeItem",value:function(t){this.comparationFacade.removeFromComparation(t)}},{key:"removeAllItems",value:function(){this.comparationFacade.removeAllFromComparation(),window.history.back()}},{key:"goBack",value:function(){window.history.back()}},{key:"sortForecast",value:function(){var t=this;this.isSortDesc=!this.isSortDesc;var a=[],i=this.isSortDesc?-1:1;this.comparationList.forEach((function(r){var o=Object.assign(Object.assign({},r),{consolidated_weather:t.sorterService.sortBy(r.consolidated_weather,"applicable_date",i)});a.push(o)})),this.comparationList=[].concat(a)}},{key:"openSnackBar",value:function(t,a){this.snackBar.open(t,a,{duration:2e3})}},{key:"ngOnDestroy",value:function(){this.destroy$.next(),this.destroy$.complete()}}])&&t(r.prototype,o),n&&t(r,n),i}(),W.\u0275fac=function(t){return new(t||W)(h.Jb(u.c),h.Jb(b.b),h.Jb(f.a),h.Jb(g.a),h.Jb(x.a))},W.\u0275cmp=h.Db({type:W,selectors:[["app-weather-comparation"]],decls:5,vars:3,consts:[["class","comparation-back-btn",4,"ngIf"],[1,"comparation-container"],["class","card-wrapper",4,"ngIf"],[1,"spinner-loader"],["color","accent",3,"diameter","strokeWidth",4,"ngIf"],[1,"comparation-back-btn"],["mat-raised-button","","color","warn",3,"click"],["svgIcon","arrow_down","aria-hidden","false","aria-label","sort desc",3,"ngStyle"],["svgIcon","arrow_up","aria-hidden","false","aria-label","sort asc",3,"ngStyle"],["mat-raised-button","","color","primary",3,"click"],[4,"ngIf"],[1,"card-wrapper"],["class","card-container",4,"ngFor","ngForOf"],[1,"card-container"],[3,"location","maxWeatherForecats","checkForMax"],["color","accent",3,"diameter","strokeWidth"]],template:function(t,a){1&t&&(h.qc(0,C,10,7,"div",0),h.Ob(1,"div",1),h.qc(2,L,2,1,"div",2),h.Ob(3,"div",3),h.qc(4,D,1,2,"mat-spinner",4),h.Nb(),h.Nb()),2&t&&(h.dc("ngIf","Done"===a.apiState||"Error"===a.apiState),h.zb(2),h.dc("ngIf","Done"===a.apiState),h.zb(2),h.dc("ngIf","Done"!==a.apiState))},directives:[c.j,v.a,u.a,c.k,c.i,F,_.a,M.b],styles:[".comparation-container[_ngcontent-%COMP%]{text-align:center;margin-left:auto;margin-right:auto;width:90%}.comparation-container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]{text-align:left}.comparation-container[_ngcontent-%COMP%]   .card-wrapper[_ngcontent-%COMP%]   .card-container[_ngcontent-%COMP%]{border:1px solid;margin-bottom:20px}.comparation-back-btn[_ngcontent-%COMP%]{margin-top:10px;margin-bottom:20px;margin-left:40px}.comparation-back-btn[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-right:20px}"]}),W)}],$=((z=function t(){a(this,t)}).\u0275mod=h.Hb({type:z}),z.\u0275inj=h.Gb({factory:function(t){return new(t||z)},imports:[[s.c.forChild(B)],s.c]}),z),J=o("l7P3"),K=o("9jGm"),q=o("/yhu"),G=o("NccN"),T=o("OhnZ"),A=((P=function t(){a(this,t)}).\u0275mod=h.Hb({type:P}),P.\u0275inj=h.Gb({factory:function(t){return new(t||P)},imports:[[c.b,$,M.a,S,v.b,T.a,u.b,g.b,J.d.forFeature(q.a.featureSelectorKey,q.b),K.c.forFeature([G.a])]]}),P)}}])}();