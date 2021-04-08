(this["webpackJsonpvoxel-edit"]=this["webpackJsonpvoxel-edit"]||[]).push([[0],{226:function(e,t,o){},231:function(e,t,o){},232:function(e,t,o){},239:function(e,t,o){},347:function(e,t,o){"use strict";o.r(t);o(225),o(226);var n=o(0),r=o.n(n),l=o(69),a=o.n(l),i=(o(231),o(1)),s=o(4),c=o(5),d=o(6),u=o(200),h=(o(232),o(7)),p=function(e){Object(c.a)(o,e);var t=Object(d.a)(o);function o(e){var n;return Object(i.a)(this,o),(n=t.call(this,e)).canvasRef=r.a.createRef(),n}return Object(s.a)(o,[{key:"componentDidMount",value:function(){this.props.callbacks.onCanvasCreation(this.canvasRef)}},{key:"render",value:function(){return Object(h.jsx)("canvas",{className:"viewportCanvas",ref:this.canvasRef})}}]),o}(r.a.Component),v=o(357),b=function(e){Object(c.a)(o,e);var t=Object(d.a)(o);function o(e){var n;return Object(i.a)(this,o),(n=t.call(this,e)).handleBrushClick=function(e,t){var o=t.name;n.setState({activeBrush:o}),n.props.callbacks.onBrushChange(o)},n.state={activeBrush:"add"},n}return Object(s.a)(o,[{key:"componentDidMount",value:function(){this.props.callbacks.onBrushChange(this.state.activeBrush)}},{key:"render",value:function(){var e=this.state.activeBrush;return Object(h.jsxs)(r.a.Fragment,{children:[Object(h.jsx)(v.a.Item,{name:"add",active:"add"===e,onClick:this.handleBrushClick,children:"Add Voxel"}),Object(h.jsx)(v.a.Item,{name:"remove",active:"remove"===e,onClick:this.handleBrushClick,children:"Remove Voxel"}),Object(h.jsx)(v.a.Item,{name:"paint",active:"paint"===e,onClick:this.handleBrushClick,children:"Paint Voxel"})]})}}]),o}(r.a.Component),j=o(356),x=o(358),f=o(355),C=function(e){Object(c.a)(o,e);var t=Object(d.a)(o);function o(e){var n;return Object(i.a)(this,o),(n=t.call(this,e)).handleInputChange=function(e){var t=e.target.value;(t=t.trim()).length<=n.maxNameLength&&n.setState({inputValue:t})},n.onSubmit=function(){n.props.onSubmit(n.state.inputValue)},n.createModal=function(){var e=0===n.state.inputValue.length;return Object(h.jsxs)(x.a,{onClose:n.props.onClose,onOpen:n.props.onOpen,open:n.props.open,closeIcon:!0,size:"mini",children:[Object(h.jsx)(x.a.Header,{children:n.props.header}),Object(h.jsx)(x.a.Content,{children:Object(h.jsx)(f.a,{action:{content:n.props.submit,disabled:e,onClick:n.onSubmit},fluid:!0,value:n.state.inputValue,onChange:n.handleInputChange,error:e,placeholder:n.props.placeholder})})]})},n.state={inputValue:""},n.maxNameLength=100,n}return Object(s.a)(o,[{key:"render",value:function(){return this.createModal()}}]),o}(r.a.Component),m=o(103),O=o.n(m),g=function(e){Object(c.a)(o,e);var t=Object(d.a)(o);function o(e){var n;return Object(i.a)(this,o),(n=t.call(this,e)).handleSaveProject=function(e){if(0!==e.length){var t=JSON.stringify(n.props.callbacks.onGetProjectData()),o=new Blob([t],{type:"application/json"});O.a.saveAs(o,e+".json"),n.setState({isSaveModalOpen:!1})}},n.onLoadProject=function(){n.loadFileInput.click()},n.handleFileSelected=function(e){var t=n.loadFileInput.files[0];if(t){n.loadFileReader.readAsText(t);var o=t.name.replace(/(.json)$/,"");n.setState({saveInputValue:o}),n.loadFileInput.value=""}},n.handleFileRead=function(e){var t=JSON.parse(e.target.result);n.props.callbacks.onLoadProjectData(t)},n.createExportModal=function(){return Object(h.jsx)(C,{onClose:function(){return n.setState({isExportModalOpen:!1})},onOpen:function(){return n.setState({isExportModalOpen:!0})},open:n.state.isExportModalOpen,onSubmit:n.onExportModel,header:"Export Model As...",submit:"Export .".concat(n.state.exportType),placeholder:"Enter export name..."})},n.createSaveModal=function(){return Object(h.jsx)(C,{onClose:function(){return n.setState({isSaveModalOpen:!1})},onOpen:function(){return n.setState({isSaveModalOpen:!0})},open:n.state.isSaveModalOpen,onSubmit:n.handleSaveProject,header:"Save Project As...",submit:"Save Project",placeholder:"Enter project name..."})},n.createExportSubMenu=function(){return Object(h.jsx)(j.a,{text:"Export",pointing:"left",className:"link item",children:Object(h.jsxs)(j.a.Menu,{children:[Object(h.jsx)(j.a.Item,{onClick:function(){return n.setState({isExportModalOpen:!0,exportType:"dae"})},children:"Collada (.dae)"}),Object(h.jsx)(j.a.Item,{onClick:function(){return n.setState({isExportModalOpen:!0,exportType:"ply"})},children:"Stanford (.ply)"}),Object(h.jsx)(j.a.Item,{onClick:function(){return n.setState({isExportModalOpen:!0,exportType:"stl"})},children:"Stl (.stl)"}),Object(h.jsx)(j.a.Item,{onClick:function(){return n.setState({isExportModalOpen:!0,exportType:"obj"})},children:"Wavefront (.obj)"})]})})},n.onExportModel=function(e){n.props.callbacks.onExportModel(e,n.state.exportType),n.setState({isExportModalOpen:!1})},n.state={isSaveModalOpen:!1,isExportModalOpen:!1,exportType:""},n.loadFileInput=document.createElement("input"),n.loadFileInput.type="file",n.loadFileInput.accept=".json",n.loadFileInput.addEventListener("change",n.handleFileSelected),n.loadFileReader=new FileReader,n.loadFileReader.addEventListener("load",n.handleFileRead),n}return Object(s.a)(o,[{key:"render",value:function(){var e=this;return Object(h.jsxs)(r.a.Fragment,{children:[this.createSaveModal(),this.createExportModal(),Object(h.jsx)(j.a,{text:"File",pointing:!0,className:"link item",children:Object(h.jsxs)(j.a.Menu,{children:[Object(h.jsx)(j.a.Item,{onClick:this.props.callbacks.onNewProject,children:"New Project"}),Object(h.jsx)(j.a.Item,{onClick:function(){return e.setState({isSaveModalOpen:!0})},children:"Save Project"}),Object(h.jsx)(j.a.Item,{onClick:this.onLoadProject,children:"Load Project"}),this.createExportSubMenu()]})})]})}}]),o}(r.a.Component),k=function(e){Object(c.a)(o,e);var t=Object(d.a)(o);function o(e){var n;return Object(i.a)(this,o),(n=t.call(this,e)).onExportImage=function(e){0!==e.length&&(n.props.callbacks.onExportImage(e),n.setState({isExportModalOpen:!1}))},n.createExportImageModal=function(){return Object(h.jsx)(C,{onClose:function(){return n.setState({isExportModalOpen:!1})},onOpen:function(){return n.setState({isExportModalOpen:!0})},open:n.state.isExportModalOpen,onSubmit:n.onExportImage,header:"Export Image As...",submit:"Export Image",placeholder:"Enter image name..."})},n.state={isExportModalOpen:!1},n}return Object(s.a)(o,[{key:"render",value:function(){var e=this;return Object(h.jsxs)(r.a.Fragment,{children:[this.createExportImageModal(),Object(h.jsx)(j.a,{text:"Render",pointing:!0,className:"link item",children:Object(h.jsx)(j.a.Menu,{children:Object(h.jsx)(j.a.Item,{onClick:function(){return e.setState({isExportModalOpen:!0})},children:"Export Scene to Image"})})})]})}}]),o}(r.a.Component),S=o(74),w=function(){return Object(h.jsxs)(v.a.Item,{href:"https://github.com/kenny-designs/voxel-edit",target:"_blank",children:[Object(h.jsx)(S.a,{name:"github"}),"GitHub"]})},y=(o(239),o(211)),M=function(e){var t=e.color,o=e.id,n=e.isActive,r=t.getRGB255(),l=r.r,a=r.g,i=r.b;return Object(h.jsx)("div",{onClick:function(){e.onColorCellClick(o,{r:l,g:a,b:i})},className:"color-cell ".concat(n?"active":""),style:{backgroundColor:"rgb(".concat(l,", ").concat(a,", ").concat(i,")")}})},I=function(e){Object(c.a)(o,e);var t=Object(d.a)(o);function o(e){var n;Object(i.a)(this,o),(n=t.call(this,e)).updateColorData=function(){var e=n.props.callbacks.onGetColorData(),t=e.currentColor,o=e.selectedColorIndex,r=e.isColorsFull,l={};n.state.isColorsFull!==r&&(l.isColorsFull=r),n.state.selectedColorIndex!==o&&(l.selectedColorIndex=o);var a=n.state.currentColor,i=a.r,s=a.g,c=a.b;i===t.r&&s===t.g&&c===t.b||(l.currentColor=t),0!==Object.keys(l).length&&n.setState(l)},n.handlePickerChange=function(e){var t=e.rgb;n.props.callbacks.onSelectedColorChange(n.state.selectedColorIndex,t),n.updateColorData()},n.onColorCellClick=function(e,t){n.props.callbacks.onNewSelectedColor(e),n.updateColorData()},n.onAddCellClick=function(){n.props.callbacks.onAddColor(),n.updateColorData()},n.getColorCells=function(){var e=[];return n.props.callbacks.onGetColorData().colors.forEach((function(t,o){e.push(Object(h.jsx)(M,{id:o,onColorCellClick:n.onColorCellClick,color:t,isActive:o===n.state.selectedColorIndex},o))})),e},n.getAddColorCell=function(){return n.state.isColorsFull?null:Object(h.jsx)("div",{className:"color-cell add-cell-btn",onClick:n.onAddCellClick,children:Object(h.jsx)(S.a,{name:"plus"})})};var r=n.props.callbacks.onGetColorData(),l=r.currentColor,a=r.selectedColorIndex,s=r.isColorsFull;return n.state={currentColor:l,selectedColorIndex:a,isColorsFull:s},n}return Object(s.a)(o,[{key:"componentDidUpdate",value:function(){this.updateColorData()}},{key:"render",value:function(){return Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{className:"color-cell-container",children:[this.getColorCells(),this.getAddColorCell()]}),Object(h.jsx)(y.a,{color:this.state.currentColor,disableAlpha:!0,onChange:this.handlePickerChange})]})}}]),o}(r.a.Component),E=o(361),P=o(362),A=o(359),R=o(363),z=o(348),D=function(e){Object(c.a)(o,e);var t=Object(d.a)(o);function o(e){var n;return Object(i.a)(this,o),(n=t.call(this,e)).updateMobileState=function(){var e=window.innerWidth<768;n.setState({isMobile:e})},n.handleAccordionIndicesChange=function(e,t){var o=Object(u.a)({},n.state.desktop),r=o[t].activeAccordionIndices,l=r.indexOf(e);-1!==l?r.splice(l,1):r.push(e),n.setState({desktop:o})},n.createDesktopBrush=function(){var e=n.state.desktop.brushSettings;return Object(h.jsx)(E.a.Group,{children:Object(h.jsxs)(E.a,{inverted:!0,children:[Object(h.jsxs)(P.a,{as:"h4",inverted:!0,children:[Object(h.jsx)(S.a,{name:"paint brush"}),Object(h.jsxs)(P.a.Content,{children:["Brush Settings",Object(h.jsx)(P.a.Subheader,{children:"Add, remove, or paint voxels"})]})]}),Object(h.jsxs)(A.a,{inverted:!0,fluid:!0,exclusive:!1,children:[Object(h.jsx)(A.a.Title,{active:e.activeAccordionIndices.includes(0),content:"Brush Action",index:0,onClick:function(e,t){n.handleAccordionIndicesChange(t.index,"brushSettings")}}),Object(h.jsx)(A.a.Content,{active:e.activeAccordionIndices.includes(0),children:Object(h.jsx)(v.a,{inverted:!0,vertical:!0,fluid:!0,children:Object(h.jsx)(b,{callbacks:n.props.callbacks.brush})})})]})]})})},n.createDesktopColorPalette=function(){var e=n.state.desktop.colorPalette;return Object(h.jsx)(E.a.Group,{children:Object(h.jsxs)(E.a,{inverted:!0,children:[Object(h.jsxs)(P.a,{as:"h4",inverted:!0,children:[Object(h.jsx)(S.a,{name:"tint"}),Object(h.jsxs)(P.a.Content,{children:["Color Palette",Object(h.jsx)(P.a.Subheader,{children:"Select a color to paint with"})]})]}),Object(h.jsxs)(A.a,{inverted:!0,fluid:!0,exclusive:!1,children:[Object(h.jsx)(A.a.Title,{active:e.activeAccordionIndices.includes(0),content:"Color Selection",index:0,onClick:function(e,t){n.handleAccordionIndicesChange(t.index,"colorPalette")}}),Object(h.jsx)(A.a.Content,{active:e.activeAccordionIndices.includes(0),children:Object(h.jsx)(I,{callbacks:n.props.callbacks.colorPalette})})]})]})})},n.state={isMobile:!1,mobile:{isColorModalOpen:!1},desktop:{brushSettings:{activeAccordionIndices:[0]},colorPalette:{activeAccordionIndices:[0]}}},n}return Object(s.a)(o,[{key:"componentDidMount",value:function(){this.updateMobileState(),window.addEventListener("resize",this.updateMobileState)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateMobileState)}},{key:"createDesktopViewport",value:function(){return Object(h.jsx)(p,{callbacks:this.props.callbacks.viewport})}},{key:"createDesktopGUI",value:function(){return Object(h.jsxs)(R.a,{padded:!0,style:{height:"100vh"},children:[Object(h.jsx)(R.a.Row,{style:{paddingTop:"0",paddingBottom:"0"},children:Object(h.jsx)(R.a.Column,{children:Object(h.jsxs)(v.a,{inverted:!0,children:[Object(h.jsx)(g,{callbacks:this.props.callbacks.file}),Object(h.jsx)(k,{callbacks:this.props.callbacks.render}),Object(h.jsx)(w,{})]})})}),Object(h.jsxs)(R.a.Row,{style:{height:"90%",paddingTop:"0",paddingBottom:"0"},children:[Object(h.jsxs)(R.a.Column,{width:3,style:{height:"100%",overflowY:"auto"},children:[this.createDesktopBrush(),this.createDesktopColorPalette()]}),Object(h.jsx)(R.a.Column,{width:13,style:{height:"100%"},children:this.createDesktopViewport()})]})]})}},{key:"createMobileModal",value:function(){var e=this;return Object(h.jsxs)(x.a,{open:this.state.mobile.isColorModalOpen,onClose:function(){return e.setState({mobile:{isColorModalOpen:!1}})},onOpen:function(){return e.setState({mobile:{isColorModalOpen:!0}})},children:[Object(h.jsx)(x.a.Header,{children:"Color Palette"}),Object(h.jsx)(x.a.Content,{scrolling:!0,children:Object(h.jsx)(x.a.Description,{children:Object(h.jsx)(I,{callbacks:this.props.callbacks.colorPalette})})}),Object(h.jsx)(x.a.Actions,{children:Object(h.jsx)(z.a,{onClick:function(){return e.setState({mobile:{isColorModalOpen:!1}})},primary:!0,children:"Close"})})]})}},{key:"createMobileGUI",value:function(){var e=this;return Object(h.jsxs)("div",{style:{height:window.innerHeight},children:[Object(h.jsxs)(v.a,{fixed:"top",inverted:!0,children:[Object(h.jsx)(g,{callbacks:this.props.callbacks.file}),Object(h.jsx)(k,{callbacks:this.props.callbacks.render}),Object(h.jsx)(w,{})]}),Object(h.jsx)(p,{callbacks:this.props.callbacks.viewport}),this.createMobileModal(),Object(h.jsxs)(v.a,{fixed:"bottom",inverted:!0,style:{overflowX:"auto"},children:[Object(h.jsx)(b,{callbacks:this.props.callbacks.brush}),Object(h.jsx)(v.a.Item,{as:"a",onClick:function(){return e.setState({mobile:{isColorModalOpen:!0}})},children:"Color Palette"})]})]})}},{key:"render",value:function(){return this.state.isMobile?this.createMobileGUI():this.createDesktopGUI()}}]),o}(r.a.Component),F=o(105),N=o(12),V=o(210),B=o(206),G=o(207),T=o(209),L=o(208),q=o(98),W=function(){function e(t){Object(i.a)(this,e),this.cellSize=t.cellSize,this.tileSize=t.tileSize,this.tileTextureWidth=t.tileTextureWidth,this.tileTextureHeight=t.tileTextureHeight,this.material=t.material,this.colorPalette=t.colorPalette,this.cellSliceSize=this.cellSize*this.cellSize,this.cells=t.cells,this.cellIdToMesh={},this.neighborOffsets=[[0,0,0],[-1,0,0],[1,0,0],[0,-1,0],[0,1,0],[0,0,-1],[0,0,1]]}return Object(s.a)(e,[{key:"computeVoxelOffset",value:function(e,t,o){var n=this.cellSize,r=this.cellSliceSize,l=0|N.h.euclideanModulo(e,n);return(0|N.h.euclideanModulo(t,n))*r+(0|N.h.euclideanModulo(o,n))*n+l}},{key:"computeCellId",value:function(e,t,o){var n=this.cellSize,r=Math.floor(e/n),l=Math.floor(t/n),a=Math.floor(o/n);return"".concat(r,",").concat(l,",").concat(a)}},{key:"addCellForVoxel",value:function(e,t,o){var n=this.computeCellId(e,t,o),r=this.cells[n];if(!r){var l=this.cellSize;r=new Uint8Array(l*l*l),this.cells[n]=r}return r}},{key:"getCellForVoxel",value:function(e,t,o){return this.cells[this.computeCellId(e,t,o)]}},{key:"setVoxel",value:function(e,t,o,n){var r=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],l=this.getCellForVoxel(e,t,o);if(!l){if(!r)return;l=this.addCellForVoxel(e,t,o)}var a=this.computeVoxelOffset(e,t,o);l[a]=n}},{key:"getVoxel",value:function(e,t,o){var n=this.getCellForVoxel(e,t,o);return n?n[this.computeVoxelOffset(e,t,o)]:0}},{key:"generateGeometryDataForCell",value:function(t,o,n){for(var r=this.cellSize,l=this.tileSize,a=this.tileTextureWidth,i=this.tileTextureHeight,s=[],c=[],d=[],u=[],h=[],p=t*r,v=o*r,b=n*r,j=0;j<r;++j)for(var x=v+j,f=0;f<r;++f)for(var C=b+f,m=0;m<r;++m){var O=p+m,g=this.getVoxel(O,x,C);if(g){var k,S=g-1,w=Object(q.a)(e.faces);try{for(w.s();!(k=w.n()).done;){var y=k.value,M=y.dir,I=y.corners,E=y.uvRow;if(!this.getVoxel(O+M[0],x+M[1],C+M[2])){var P,A=s.length/3,R=Object(q.a)(I);try{for(R.s();!(P=R.n()).done;){var z=P.value,D=z.pos,N=z.uv;s.push(D[0]+m,D[1]+j,D[2]+f),c.push.apply(c,Object(F.a)(M)),d.push((S+N[0])*l/a,1-(E+1-N[1])*l/i);var V=this.colorPalette.getColorAtIndex(g-1);h.push(V.r,V.g,V.b)}}catch(B){R.e(B)}finally{R.f()}u.push(A,A+1,A+2,A+2,A+1,A+3)}}}catch(B){w.e(B)}finally{w.f()}}}return{positions:s,normals:c,uvs:d,indices:u,colors:h}}},{key:"intersectRay",value:function(e,t){var o=t.x-e.x,n=t.y-e.y,r=t.z-e.z,l=o*o+n*n+r*r,a=Math.sqrt(l);o/=a,n/=a,r/=a;for(var i=0,s=Math.floor(e.x),c=Math.floor(e.y),d=Math.floor(e.z),u=o>0?1:-1,h=n>0?1:-1,p=r>0?1:-1,v=Math.abs(1/o),b=Math.abs(1/n),j=Math.abs(1/r),x=u>0?s+1-e.x:e.x-s,f=h>0?c+1-e.y:e.y-c,C=p>0?d+1-e.z:e.z-d,m=v<1/0?v*x:1/0,O=b<1/0?b*f:1/0,g=j<1/0?j*C:1/0,k=-1;i<=a;){var S=this.getVoxel(s,c,d);if(S)return{position:[e.x+i*o,e.y+i*n,e.z+i*r],normal:[0===k?-u:0,1===k?-h:0,2===k?-p:0],voxel:S};m<O?m<g?(s+=u,i=m,m+=v,k=0):(d+=p,i=g,g+=j,k=2):O<g?(c+=h,i=O,O+=b,k=1):(d+=p,i=g,g+=j,k=2)}return null}},{key:"updateVoxelGeometry",value:function(e,t,o,n){var r,l={},a=Object(q.a)(this.neighborOffsets);try{for(a.s();!(r=a.n()).done;){var i=r.value,s=t+i[0],c=o+i[1],d=n+i[2],u=this.computeCellId(s,c,d);l[u]||(l[u]=!0,this.updateCellGeometry(e,s,c,d))}}catch(h){a.e(h)}finally{a.f()}}},{key:"updateCellGeometry",value:function(e,t,o,n){var r=this.cellSize,l=Math.floor(t/r),a=Math.floor(o/r),i=Math.floor(n/r),s=this.computeCellId(t,o,n),c=this.cellIdToMesh[s],d=c?c.geometry:new N.b,u=this.generateGeometryDataForCell(l,a,i),h=u.positions,p=u.normals,v=u.indices,b=u.colors;d.setAttribute("position",new N.a(new Float32Array(h),3));d.setAttribute("normal",new N.a(new Float32Array(p),3));d.setAttribute("color",new N.a(new Float32Array(b),3)),d.setIndex(v),d.computeBoundingSphere(),c||((c=new N.k(d,this.material)).name=s,this.cellIdToMesh[s]=c,e.add(c),c.position.set(l*r,a*r,i*r))}},{key:"updateWorldGeometry",value:function(e){var t=this,o=Object.keys(this.cells),n=/^(-?\d+),(-?\d+),(-?\d+)$/;o.forEach((function(o){var r=o.match(n),l=parseInt(r[1],10),a=parseInt(r[2],10),i=parseInt(r[3],10);t.updateCellGeometry(e,l*t.cellSize,a*t.cellSize,i*t.cellSize)}))}},{key:"removeAllCells",value:function(e){var t=this;Object.keys(this.cellIdToMesh).forEach((function(o){var n=t.cellIdToMesh[o];n.geometry.dispose(),e.remove(n)})),this.cellIdToMesh={},this.cells={}}}]),e}();W.faces=[{uvRow:0,dir:[-1,0,0],corners:[{pos:[0,1,0],uv:[0,1]},{pos:[0,0,0],uv:[0,0]},{pos:[0,1,1],uv:[1,1]},{pos:[0,0,1],uv:[1,0]}]},{uvRow:0,dir:[1,0,0],corners:[{pos:[1,1,1],uv:[0,1]},{pos:[1,0,1],uv:[0,0]},{pos:[1,1,0],uv:[1,1]},{pos:[1,0,0],uv:[1,0]}]},{uvRow:1,dir:[0,-1,0],corners:[{pos:[1,0,1],uv:[1,0]},{pos:[0,0,1],uv:[0,0]},{pos:[1,0,0],uv:[1,1]},{pos:[0,0,0],uv:[0,1]}]},{uvRow:2,dir:[0,1,0],corners:[{pos:[0,1,1],uv:[1,1]},{pos:[1,1,1],uv:[0,1]},{pos:[0,1,0],uv:[1,0]},{pos:[1,1,0],uv:[0,0]}]},{uvRow:0,dir:[0,0,-1],corners:[{pos:[1,0,0],uv:[0,0]},{pos:[0,0,0],uv:[1,0]},{pos:[1,1,0],uv:[0,1]},{pos:[0,1,0],uv:[1,1]}]},{uvRow:0,dir:[0,0,1],corners:[{pos:[0,0,1],uv:[0,0]},{pos:[1,0,1],uv:[1,0]},{pos:[0,1,1],uv:[0,1]},{pos:[1,1,1],uv:[1,1]}]}];var H=W,U=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"add";Object(i.a)(this,e),this.setCurrentBrush(t)}return Object(s.a)(e,[{key:"setCurrentBrush",value:function(t){var o=e.brushOptions[t];o&&(this.currentBrush=o)}}]),e}();U.brushOptions={add:"add",remove:"remove",paint:"paint"};var X=U,Y=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;Object(i.a)(this,e),this.colors=null,this.selectedColor=0,this.setNewColorsArray(t||[new J(.5176,.7843,.0902)]),this.setSelectedColor(o),this.maxColors=128}return Object(s.a)(e,[{key:"restoreDefaults",value:function(){this.selectedColor=0,this.colors=[new J(.5176,.7843,.0902)]}},{key:"setNewColorsArray",value:function(e){this.colors=e.map((function(e){var t=e.r,o=e.g,n=e.b;return new J(t,o,n)}))}},{key:"addColor",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.isColorsFull()||(this.colors.push(new J(e,t,o)),this.selectedColor=this.colors.length-1)}},{key:"isColorsFull",value:function(){return this.colors.length>=this.maxColors}},{key:"setColorAtIndex",value:function(e,t,o,n){e<0||e>=this.colors.length||(this.colors[e].r=t,this.colors[e].g=o,this.colors[e].b=n)}},{key:"getColorAtIndex",value:function(e){return e<0||e>=this.colors.length?null:this.colors[e]}},{key:"getSelectedColor",value:function(){return this.colors[this.selectedColor]}},{key:"setSelectedColor",value:function(e){if(e<0||e>=this.colors.length)return null;this.selectedColor=e}},{key:"getSelectedColorIndex",value:function(){return this.selectedColor}},{key:"getColorsArray",value:function(){return this.colors}}]),e}(),J=function(){function e(t,o,n){Object(i.a)(this,e),this.r=t,this.g=o,this.b=n}return Object(s.a)(e,[{key:"getRGB255",value:function(){return{r:255*this.r,g:255*this.g,b:255*this.b}}}]),e}(),$=Y;function _(e,t,o,n,r){for(var l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1,a=t*r,i=o*r,s=n*r,c=0;c<r;++c)for(var d=0;d<r;++d)e.setVoxel(a+d,i,s+c,l)}var K=function(){function e(t){var o=this;Object(i.a)(this,e),this.render=function(){o.renderRequested=void 0,o.resizeRendererToDisplaySize(o.renderer)&&(o.camera.aspect=o.canvas.clientWidth/o.canvas.clientHeight,o.camera.updateProjectionMatrix()),o.controls.update(),o.renderer.render(o.scene,o.camera)},this.requestRenderIfNotRequested=function(){o.renderRequested||(o.renderRequested=!0,requestAnimationFrame(o.render))},this.recordStartPosition=function(e){var t=o.mouse;t.x=e.clientX,t.y=e.clientY,t.moveX=0,t.moveY=0},this.recordMovement=function(e){var t=o.mouse;t.moveX+=Math.abs(t.x-e.clientX),t.moveY+=Math.abs(t.y-e.clientY)},this.placeVoxelIfNoMovement=function(e){var t=o.mouse;t.moveX<5&&t.moveY<5&&o.placeVoxel(e),window.removeEventListener("pointermove",o.recordMovement),window.removeEventListener("pointerup",o.placeVoxelIfNoMovement)},this.onSelectedColorChange=function(e,t,n,r){o.world.colorPalette.setColorAtIndex(e,t,n,r),o.world.updateWorldGeometry(o.scene),o.requestRenderIfNotRequested()},this.onNewSelectedColor=function(e){o.world.colorPalette.setSelectedColor(e)},this.onGetProjectData=function(){return{voxelWorld:{cellSize:o.world.cellSize,cells:o.world.cells},colorPalette:{colors:o.world.colorPalette.getColorsArray(),selectedColor:o.world.colorPalette.getSelectedColorIndex()}}},this.onLoadProjectData=function(e){var t=e.voxelWorld,n=e.colorPalette;o.world.removeAllCells(o.scene),o.world.colorPalette.setNewColorsArray(n.colors),o.world.colorPalette.setSelectedColor(n.selectedColor),o.world.cells=t.cells,o.world.cellSize=t.cellSize,o.world.updateWorldGeometry(o.scene),o.requestRenderIfNotRequested()},this.onExportImage=function(e){o.render(),o.canvas.toBlob((function(t){O.a.saveAs(t,e+".png")}),"image/png")},this.onExportModel=function(e,t){var n,r;switch(t){case"obj":n=new B.a,r="model/obj";break;case"ply":n=new G.a,r="text/plain";break;case"stl":n=new L.a,r="model/stl";break;case"dae":n=new T.a,r="model/vnd.collada+xml";break;default:n=null}if(n){var l=n.parse(o.scene),a=new Blob([l],{type:r});O.a.saveAs(a,e+"."+t)}},this.onNewProject=function(){o.world.removeAllCells(o.scene),o.world.colorPalette.restoreDefaults(),_(o.world,0,0,0,o.cellSize,1),o.world.updateWorldGeometry(o.scene),o.requestRenderIfNotRequested()},this.canvas=t.canvas,this.renderer=new N.u({canvas:this.canvas,antialias:!0}),this.cellSize=32,this.createCamera(),this.createOrbitControls(),this.scene=new N.p,this.scene.background=new N.c("#3C3C3C"),this.addLight(-1,2,4),this.addLight(1,-1,-2);var n=new N.m({side:N.e,alphaTest:.1,transparent:!0,vertexColors:!0}),r=t.world,l=r?r.colorPalette:new $,a=r?r.cells:{};this.world=new H({cellSize:this.cellSize,tileSize:16,tileTextureWidth:256,tileTextureHeight:64,material:n,colorPalette:l,cells:a}),r||_(this.world,0,0,0,this.cellSize,1),this.world.updateWorldGeometry(this.scene),this.renderRequested=!1,this.mouse={x:0,y:0,moveX:0,moveY:0},this.canvas.addEventListener("pointerdown",(function(e){e.preventDefault(),o.recordStartPosition(e),window.addEventListener("pointermove",o.recordMovement),window.addEventListener("pointerup",o.placeVoxelIfNoMovement)}),{passive:!1}),this.canvas.addEventListener("touchstart",(function(e){e.preventDefault()}),{passive:!1}),this.controls.addEventListener("change",this.requestRenderIfNotRequested),window.addEventListener("resize",this.requestRenderIfNotRequested),this.brush=new X,this.render()}return Object(s.a)(e,[{key:"createCamera",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:75,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.1,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1e3;this.camera=new N.n(e,t,o,n),this.camera.position.set(.2*-this.cellSize,.3*this.cellSize,.2*-this.cellSize)}},{key:"createOrbitControls",value:function(){this.controls=new V.a(this.camera,this.canvas),this.controls.target.set(this.cellSize/2,0,this.cellSize/2),this.controls.update()}},{key:"addLight",value:function(e,t,o){var n=new N.d(16777215,1);n.position.set(e,t,o),this.scene.add(n)}},{key:"resizeRendererToDisplaySize",value:function(e){var t=e.domElement,o=t.clientWidth,n=t.clientHeight,r=t.width!==o||t.height!==n;return r&&e.setSize(o,n,!1),r}},{key:"getCanvasRelativePosition",value:function(e){var t=this.canvas,o=t.getBoundingClientRect();return{x:(e.clientX-o.left)*t.width/o.width,y:(e.clientY-o.top)*t.height/o.height}}},{key:"placeVoxel",value:function(e){var t=this,o=this.getCanvasRelativePosition(e),n=o.x/this.canvas.width*2-1,r=o.y/this.canvas.height*-2+1,l=new N.t,a=new N.t;l.setFromMatrixPosition(this.camera.matrixWorld),a.set(n,r,1).unproject(this.camera);var i=this.world.intersectRay(l,a);if(i){var s,c,d=this.brush.currentBrush===X.brushOptions.remove?0:this.world.colorPalette.getSelectedColorIndex()+1,u=i.position.map((function(e,o){return e+i.normal[o]*(t.brush.currentBrush===X.brushOptions.add?.5:-.5)}));(s=this.world).setVoxel.apply(s,Object(F.a)(u).concat([d])),(c=this.world).updateVoxelGeometry.apply(c,[this.scene].concat(Object(F.a)(u))),this.requestRenderIfNotRequested()}}}]),e}(),Q=function(e){Object(c.a)(o,e);var t=Object(d.a)(o);function o(e){var n;return Object(i.a)(this,o),(n=t.call(this,e)).createVoxelWorld=function(e){if(e)if(n.voxelEditor){var t=n.voxelEditor.world;n.voxelEditor=new K({canvas:e.current,world:t})}else n.voxelEditor=new K({canvas:e.current})},n.setCurrentBrush=function(e){n.voxelEditor&&n.voxelEditor.brush.setCurrentBrush(e)},n.onGetColorData=function(){if(!n.voxelEditor)return{colors:[],selectedColorIndex:0,currentColor:{r:127.5,g:127.5,b:127.5},isColorsFull:!0};var e=n.voxelEditor.world.colorPalette,t=e.getSelectedColor().getRGB255(),o=t.r,r=t.g,l=t.b;return{colors:e.getColorsArray(),selectedColorIndex:e.getSelectedColorIndex(),currentColor:{r:o,g:r,b:l},isColorsFull:e.isColorsFull()}},n.onSelectedColorChange=function(e,t){if(n.voxelEditor){var o=t.r,r=t.g,l=t.b;n.voxelEditor.onSelectedColorChange(e,o/255,r/255,l/255)}},n.onNewSelectedColor=function(e){n.voxelEditor&&n.voxelEditor.onNewSelectedColor(e)},n.onAddColor=function(){n.voxelEditor&&n.voxelEditor.world.colorPalette.addColor()},n.onGetProjectData=function(){return n.voxelEditor?n.voxelEditor.onGetProjectData():{}},n.onLoadProjectData=function(e){n.voxelEditor&&(n.voxelEditor.onLoadProjectData(e),n.forceUpdate())},n.onExportImage=function(e){if(!n.voxelEditor)return null;n.voxelEditor.onExportImage(e)},n.onExportModel=function(e,t){n.voxelEditor&&n.voxelEditor.onExportModel(e,t)},n.onNewProject=function(){n.voxelEditor&&(n.voxelEditor.onNewProject(),n.forceUpdate())},n.getCallbacksObject=function(){return{brush:{onBrushChange:n.setCurrentBrush},colorPalette:{onGetColorData:n.onGetColorData,onSelectedColorChange:n.onSelectedColorChange,onNewSelectedColor:n.onNewSelectedColor,onAddColor:n.onAddColor},viewport:{onCanvasCreation:n.createVoxelWorld},file:{onGetProjectData:n.onGetProjectData,onLoadProjectData:n.onLoadProjectData,onExportModel:n.onExportModel,onNewProject:n.onNewProject},render:{onExportImage:n.onExportImage}}},n.voxelEditor=null,n.callbacks=n.getCallbacksObject(),n}return Object(s.a)(o,[{key:"render",value:function(){return Object(h.jsx)(D,{callbacks:this.callbacks})}}]),o}(r.a.Component),Z=function(){return Object(h.jsx)(Q,{})};a.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(Z,{})}),document.getElementById("root"))}},[[347,1,2]]]);
//# sourceMappingURL=main.3f7d0dab.chunk.js.map