(this["webpackJsonpvoxel-edit"]=this["webpackJsonpvoxel-edit"]||[]).push([[0],{101:function(e,t,i){},107:function(e,t,i){"use strict";i.r(t);i(93);var n=i(5),o=i.n(n),A=i(50),a=i.n(A),r=(i(98),i(0)),c=i(3),l=i(1),s=i(2),u=(i(99),i(8)),v=function(e){Object(l.a)(i,e);var t=Object(s.a)(i);function i(e){var n;return Object(r.a)(this,i),(n=t.call(this,e)).canvasRef=o.a.createRef(),n}return Object(c.a)(i,[{key:"componentDidMount",value:function(){this.props.onCanvasCreation(this.canvasRef)}},{key:"render",value:function(){return Object(u.jsx)("canvas",{className:"viewportCanvas",ref:this.canvasRef})}}]),i}(o.a.Component),h=(i(101),i(120)),d=i(121),b=i(119),g=i(122),w=function(e){Object(l.a)(i,e);var t=Object(s.a)(i);function i(e){var n;return Object(r.a)(this,i),(n=t.call(this,e)).updateMobileState=function(){var e=window.innerWidth<768;n.setState({isMobile:e})},n.state={isMobile:!1},n}return Object(c.a)(i,[{key:"componentDidMount",value:function(){this.updateMobileState(),window.addEventListener("resize",this.updateMobileState)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateMobileState)}},{key:"createDesktopViewport",value:function(){return Object(u.jsxs)(h.a.Pushable,{as:d.a,children:[Object(u.jsxs)(h.a,{as:b.a,inverted:!0,direction:"top",visible:!0,width:"very thin",children:[Object(u.jsx)(b.a.Item,{as:"a",children:"Undo"}),Object(u.jsx)(b.a.Item,{as:"a",children:"Redo"})]}),Object(u.jsx)(v,{onCanvasCreation:this.props.onCanvasCreation})]})}},{key:"createDesktopGUI",value:function(){return Object(u.jsx)(g.a,{celled:!0,className:"desktopGrid",children:Object(u.jsxs)(g.a.Row,{children:[Object(u.jsx)(g.a.Column,{width:3,children:Object(u.jsx)("h1",{children:"Left Panel"})}),Object(u.jsx)(g.a.Column,{width:11,style:{padding:"0"},children:this.createDesktopViewport()}),Object(u.jsx)(g.a.Column,{width:2,children:Object(u.jsx)("h1",{children:"Right Panel"})})]})})}},{key:"createMobileGUI",value:function(){return Object(u.jsx)("div",{style:{height:window.innerHeight},children:Object(u.jsxs)(h.a.Pushable,{as:d.a,style:{border:"none",borderRadius:"0"},children:[Object(u.jsxs)(h.a,{as:b.a,inverted:!0,direction:"top",visible:!0,width:"very thin",children:[Object(u.jsx)(b.a.Item,{as:"a",children:"Color Palette"}),Object(u.jsx)(b.a.Item,{as:"a",children:"Edit"}),Object(u.jsx)(b.a.Item,{as:"a",children:"Camera"}),Object(u.jsx)(b.a.Item,{as:"a",children:"Project"})]}),Object(u.jsxs)(h.a,{as:b.a,inverted:!0,direction:"bottom",visible:!0,width:"thin",children:[Object(u.jsx)(b.a.Item,{as:"a",children:"Add"}),Object(u.jsx)(b.a.Item,{as:"a",children:"Remove"}),Object(u.jsx)(b.a.Item,{as:"a",children:"Paint"})]}),Object(u.jsx)(v,{onCanvasCreation:this.props.onCanvasCreation})]})})}},{key:"render",value:function(){return this.state.isMobile?this.createMobileGUI():this.createDesktopGUI()}}]),i}(o.a.Component),j=i(68),p=i(47),f=i(6),B=i(82),m=function(){function e(t){Object(r.a)(this,e),this.cellSize=t.cellSize,this.tileSize=t.tileSize,this.tileTextureWidth=t.tileTextureWidth,this.tileTextureHeight=t.tileTextureHeight;var i=this.cellSize;this.cellSliceSize=i*i,this.cells={}}return Object(c.a)(e,[{key:"computeVoxelOffset",value:function(e,t,i){var n=this.cellSize,o=this.cellSliceSize,A=0|f.h.euclideanModulo(e,n);return(0|f.h.euclideanModulo(t,n))*o+(0|f.h.euclideanModulo(i,n))*n+A}},{key:"computeCellId",value:function(e,t,i){var n=this.cellSize,o=Math.floor(e/n),A=Math.floor(t/n),a=Math.floor(i/n);return"".concat(o,",").concat(A,",").concat(a)}},{key:"addCellForVoxel",value:function(e,t,i){var n=this.computeCellId(e,t,i),o=this.cells[n];if(!o){var A=this.cellSize;o=new Uint8Array(A*A*A),this.cells[n]=o}return o}},{key:"getCellForVoxel",value:function(e,t,i){return this.cells[this.computeCellId(e,t,i)]}},{key:"setVoxel",value:function(e,t,i,n){var o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],A=this.getCellForVoxel(e,t,i);if(!A){if(!o)return;A=this.addCellForVoxel(e,t,i)}var a=this.computeVoxelOffset(e,t,i);A[a]=n}},{key:"getVoxel",value:function(e,t,i){var n=this.getCellForVoxel(e,t,i);return n?n[this.computeVoxelOffset(e,t,i)]:0}},{key:"generateGeometryDataForCell",value:function(t,i,n){for(var o=this.cellSize,A=this.tileSize,a=this.tileTextureWidth,r=this.tileTextureHeight,c=[],l=[],s=[],u=[],v=t*o,h=i*o,d=n*o,b=0;b<o;++b)for(var g=h+b,w=0;w<o;++w)for(var f=d+w,B=0;B<o;++B){var m=v+B,I=this.getVoxel(m,g,f);if(I){var C,D=I-1,M=Object(p.a)(e.faces);try{for(M.s();!(C=M.n()).done;){var Q=C.value,x=Q.dir,y=Q.corners,O=Q.uvRow;if(!this.getVoxel(m+x[0],g+x[1],f+x[2])){var P,z=c.length/3,E=Object(p.a)(y);try{for(E.s();!(P=E.n()).done;){var L=P.value,S=L.pos,W=L.uv;c.push(S[0]+B,S[1]+b,S[2]+w),l.push.apply(l,Object(j.a)(x)),s.push((D+W[0])*A/a,1-(O+1-W[1])*A/r)}}catch(G){E.e(G)}finally{E.f()}u.push(z,z+1,z+2,z+2,z+1,z+3)}}}catch(G){M.e(G)}finally{M.f()}}}return{positions:c,normals:l,uvs:s,indices:u}}},{key:"intersectRay",value:function(e,t){var i=t.x-e.x,n=t.y-e.y,o=t.z-e.z,A=i*i+n*n+o*o,a=Math.sqrt(A);i/=a,n/=a,o/=a;for(var r=0,c=Math.floor(e.x),l=Math.floor(e.y),s=Math.floor(e.z),u=i>0?1:-1,v=n>0?1:-1,h=o>0?1:-1,d=Math.abs(1/i),b=Math.abs(1/n),g=Math.abs(1/o),w=u>0?c+1-e.x:e.x-c,j=v>0?l+1-e.y:e.y-l,p=h>0?s+1-e.z:e.z-s,f=d<1/0?d*w:1/0,B=b<1/0?b*j:1/0,m=g<1/0?g*p:1/0,I=-1;r<=a;){var C=this.getVoxel(c,l,s);if(C)return{position:[e.x+r*i,e.y+r*n,e.z+r*o],normal:[0===I?-u:0,1===I?-v:0,2===I?-h:0],voxel:C};f<B?f<m?(c+=u,r=f,f+=d,I=0):(s+=h,r=m,m+=g,I=2):B<m?(l+=v,r=B,B+=b,I=1):(s+=h,r=m,m+=g,I=2)}return null}}]),e}();m.faces=[{uvRow:0,dir:[-1,0,0],corners:[{pos:[0,1,0],uv:[0,1]},{pos:[0,0,0],uv:[0,0]},{pos:[0,1,1],uv:[1,1]},{pos:[0,0,1],uv:[1,0]}]},{uvRow:0,dir:[1,0,0],corners:[{pos:[1,1,1],uv:[0,1]},{pos:[1,0,1],uv:[0,0]},{pos:[1,1,0],uv:[1,1]},{pos:[1,0,0],uv:[1,0]}]},{uvRow:1,dir:[0,-1,0],corners:[{pos:[1,0,1],uv:[1,0]},{pos:[0,0,1],uv:[0,0]},{pos:[1,0,0],uv:[1,1]},{pos:[0,0,0],uv:[0,1]}]},{uvRow:2,dir:[0,1,0],corners:[{pos:[0,1,1],uv:[1,1]},{pos:[1,1,1],uv:[0,1]},{pos:[0,1,0],uv:[1,0]},{pos:[1,1,0],uv:[0,0]}]},{uvRow:0,dir:[0,0,-1],corners:[{pos:[1,0,0],uv:[0,0]},{pos:[0,0,0],uv:[1,0]},{pos:[1,1,0],uv:[0,1]},{pos:[0,1,0],uv:[1,1]}]},{uvRow:0,dir:[0,0,1],corners:[{pos:[0,0,1],uv:[0,0]},{pos:[1,0,1],uv:[1,0]},{pos:[0,1,1],uv:[0,1]},{pos:[1,1,1],uv:[1,1]}]}];var I=function(e){var t=new f.t({canvas:e}),i=32,n=new f.l(75,2,.1,1e3);n.position.set(-9.6,25.6,-9.6);var o=new B.a(n,e);o.target.set(16,i/3,16),o.update();var A=new f.n;A.background=new f.c("lightblue");var a=(new f.q).load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABACAYAAAD1Xam+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGAGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMDYtMTlUMTU6NDc6MDgrMDk6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTktMDYtMTlUMTU6NDc6MDgrMDk6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTA2LTE5VDE1OjQ3OjA4KzA5OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI2ZTk2MTM4LTNjMDctNDg1NS1iMzJkLWNiODEzYWY0OWEwMCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmI3NjBlMzNkLWM1MDMtMjg0MC1iMDM2LWM5NzNjOTlhMmZmMSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjg1MWQ5N2FkLTRhOTctNDkyZS05YzcxLWFmYWRkNGY4MmMyMyIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODUxZDk3YWQtNGE5Ny00OTJlLTljNzEtYWZhZGQ0ZjgyYzIzIiBzdEV2dDp3aGVuPSIyMDE5LTA2LTE5VDE1OjQ3OjA4KzA5OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjZlOTYxMzgtM2MwNy00ODU1LWIzMmQtY2I4MTNhZjQ5YTAwIiBzdEV2dDp3aGVuPSIyMDE5LTA2LTE5VDE1OjQ3OjA4KzA5OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6yxlNQAAAMxklEQVR42u1dLa9cVRSdn8APqKhAVDzxRAWipqICgUBUICqeQDQBgXiiAvMUH0lFDUmDIAjEEw2pQDQBA0kFIQhERQUCUYFAVg6zb2ZN1tvd+3zfuTPpbrIy995zzmOYuWvd/XX2rP69vLsG/j6/vX557+b0ytdTY6///Wf14uVn68fPPnwD9x/fWqfGNmvXf/1yuX75/KdmfH9xf31x9tH6zycXE54+Ol8//OzsCuQaxuVc5ss6gNdfu/Ne1fpfL+42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",w);function r(e,t,i){var n=new f.d(16777215,1);n.position.set(e,t,i),A.add(n)}a.magFilter=f.k,a.minFilter=f.k,r(-1,2,4),r(1,-1,-2);var c=new m({cellSize:i,tileSize:16,tileTextureWidth:256,tileTextureHeight:64}),l=new f.j({map:a,side:f.e,alphaTest:.1,transparent:!0}),s={};function u(e,t,n){var o=Math.floor(e/i),a=Math.floor(t/i),r=Math.floor(n/i),u=c.computeCellId(e,t,n),v=s[u],h=v?v.geometry:new f.b,d=c.generateGeometryDataForCell(o,a,r),b=d.positions,g=d.normals,w=d.uvs,j=d.indices;h.setAttribute("position",new f.a(new Float32Array(b),3));h.setAttribute("normal",new f.a(new Float32Array(g),3));h.setAttribute("uv",new f.a(new Float32Array(w),2)),h.setIndex(j),h.computeBoundingSphere(),v||((v=new f.i(h,l)).name=u,s[u]=v,A.add(v),v.position.set(o*i,a*i,r*i))}var v=[[0,0,0],[-1,0,0],[1,0,0],[0,-1,0],[0,1,0],[0,0,-1],[0,0,1]];function h(e,t,i){var n,o={},A=Object(p.a)(v);try{for(A.s();!(n=A.n()).done;){var a=n.value,r=e+a[0],l=t+a[1],s=i+a[2],h=c.computeCellId(r,l,s);o[h]||(o[h]=!0,u(r,l,s))}}catch(d){A.e(d)}finally{A.f()}}function d(e,t,n){for(var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,A=e*i,a=t*i,r=n*i,l=0;l<i;++l)for(var s=0;s<i;++s)for(var u=0;u<i;++u){var v=(Math.sin(u/i*Math.PI*2)+Math.sin(s/i*Math.PI*3))*(i/6)+16;l<v&&c.setVoxel(A+u,a+l,r+s,o||b(1,17))}}function b(e,t){return Math.floor(Math.random()*(t-e)+e)}d(0,0,0),d(1,0,0,2),d(-1,0,0,3),d(0,0,-1,4),d(0,0,1,5),h(0,0,0),h(31,0,31);var g=!1;function w(){g=void 0,function(e){var t=e.domElement,i=t.clientWidth,n=t.clientHeight,o=t.width!==i||t.height!==n;return o&&e.setSize(i,n,!1),o}(t)&&(n.aspect=e.clientWidth/e.clientHeight,n.updateProjectionMatrix()),o.update(),t.render(A,n)}function I(){g||(g=!0,requestAnimationFrame(w))}function C(t){var i=function(t){var i=e.getBoundingClientRect();return{x:(t.clientX-i.left)*e.width/i.width,y:(t.clientY-i.top)*e.height/i.height}}(t),o=i.x/e.width*2-1,A=i.y/e.height*-2+1,a=new f.s,r=new f.s;a.setFromMatrixPosition(n.matrixWorld),r.set(o,A,1).unproject(n);var l=c.intersectRay(a,r);if(l){var s=t.shiftKey?0:1,u=l.position.map((function(e,t){return e+l.normal[t]*(s>0?.5:-.5)}));c.setVoxel.apply(c,Object(j.a)(u).concat([s])),h.apply(void 0,Object(j.a)(u)),I()}}w();var D={x:0,y:0};function M(e){D.moveX+=Math.abs(D.x-e.clientX),D.moveY+=Math.abs(D.y-e.clientY)}function Q(e){D.moveX<5&&D.moveY<5&&C(e),window.removeEventListener("pointermove",M),window.removeEventListener("pointerup",Q)}e.addEventListener("pointerdown",(function(e){e.preventDefault(),function(e){D.x=e.clientX,D.y=e.clientY,D.moveX=0,D.moveY=0}(e),window.addEventListener("pointermove",M),window.addEventListener("pointerup",Q)}),{passive:!1}),e.addEventListener("touchstart",(function(e){e.preventDefault()}),{passive:!1}),o.addEventListener("change",I),window.addEventListener("resize",I)},C=function(e){Object(l.a)(i,e);var t=Object(s.a)(i);function i(){return Object(r.a)(this,i),t.apply(this,arguments)}return Object(c.a)(i,[{key:"createVoxelWorld",value:function(e){e&&I(e.current)}},{key:"render",value:function(){return Object(u.jsx)(w,{onCanvasCreation:this.createVoxelWorld})}}]),i}(o.a.Component),D=function(){return Object(u.jsx)(C,{})};a.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(D,{})}),document.getElementById("root"))},98:function(e,t,i){},99:function(e,t,i){}},[[107,1,2]]]);
//# sourceMappingURL=main.f9e13b41.chunk.js.map