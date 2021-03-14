(this["webpackJsonpvoxel-edit"]=this["webpackJsonpvoxel-edit"]||[]).push([[0],{22:function(e,t,A){},23:function(e,t,A){},26:function(e,t,A){"use strict";A.r(t);var i=A(7),o=A.n(i),n=A(16),r=A.n(n),a=(A(22),A(0)),l=A(3),c=A(1),s=A(2),v=(A(23),A(13)),u=A(11),g=A(5),h=A(17),w=function(){function e(t){Object(a.a)(this,e),this.cellSize=t.cellSize,this.tileSize=t.tileSize,this.tileTextureWidth=t.tileTextureWidth,this.tileTextureHeight=t.tileTextureHeight;var A=this.cellSize;this.cellSliceSize=A*A,this.cells={}}return Object(l.a)(e,[{key:"computeVoxelOffset",value:function(e,t,A){var i=this.cellSize,o=this.cellSliceSize,n=0|g.h.euclideanModulo(e,i);return(0|g.h.euclideanModulo(t,i))*o+(0|g.h.euclideanModulo(A,i))*i+n}},{key:"computeCellId",value:function(e,t,A){var i=this.cellSize,o=Math.floor(e/i),n=Math.floor(t/i),r=Math.floor(A/i);return"".concat(o,",").concat(n,",").concat(r)}},{key:"addCellForVoxel",value:function(e,t,A){var i=this.computeCellId(e,t,A),o=this.cells[i];if(!o){var n=this.cellSize;o=new Uint8Array(n*n*n),this.cells[i]=o}return o}},{key:"getCellForVoxel",value:function(e,t,A){return this.cells[this.computeCellId(e,t,A)]}},{key:"setVoxel",value:function(e,t,A,i){var o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],n=this.getCellForVoxel(e,t,A);if(!n){if(!o)return;n=this.addCellForVoxel(e,t,A)}var r=this.computeVoxelOffset(e,t,A);n[r]=i}},{key:"getVoxel",value:function(e,t,A){var i=this.getCellForVoxel(e,t,A);return i?i[this.computeVoxelOffset(e,t,A)]:0}},{key:"generateGeometryDataForCell",value:function(t,A,i){for(var o=this.cellSize,n=this.tileSize,r=this.tileTextureWidth,a=this.tileTextureHeight,l=[],c=[],s=[],g=[],h=t*o,w=A*o,B=i*o,d=0;d<o;++d)for(var f=w+d,D=0;D<o;++D)for(var Q=B+D,p=0;p<o;++p){var I=h+p,M=this.getVoxel(I,f,Q);if(M){var b,m=M-1,C=Object(u.a)(e.faces);try{for(C.s();!(b=C.n()).done;){var x=b.value,y=x.dir,z=x.corners,E=x.uvRow;if(!this.getVoxel(I+y[0],f+y[1],Q+y[2])){var P,L=l.length/3,j=Object(u.a)(z);try{for(j.s();!(P=j.n()).done;){var S=P.value,N=S.pos,F=S.uv;l.push(N[0]+p,N[1]+d,N[2]+D),c.push.apply(c,Object(v.a)(y)),s.push((m+F[0])*n/r,1-(E+1-F[1])*n/a)}}catch(W){j.e(W)}finally{j.f()}g.push(L,L+1,L+2,L+2,L+1,L+3)}}}catch(W){C.e(W)}finally{C.f()}}}return{positions:l,normals:c,uvs:s,indices:g}}},{key:"intersectRay",value:function(e,t){var A=t.x-e.x,i=t.y-e.y,o=t.z-e.z,n=A*A+i*i+o*o,r=Math.sqrt(n);A/=r,i/=r,o/=r;for(var a=0,l=Math.floor(e.x),c=Math.floor(e.y),s=Math.floor(e.z),v=A>0?1:-1,u=i>0?1:-1,g=o>0?1:-1,h=Math.abs(1/A),w=Math.abs(1/i),B=Math.abs(1/o),d=v>0?l+1-e.x:e.x-l,f=u>0?c+1-e.y:e.y-c,D=g>0?s+1-e.z:e.z-s,Q=h<1/0?h*d:1/0,p=w<1/0?w*f:1/0,I=B<1/0?B*D:1/0,M=-1;a<=r;){var b=this.getVoxel(l,c,s);if(b)return{position:[e.x+a*A,e.y+a*i,e.z+a*o],normal:[0===M?-v:0,1===M?-u:0,2===M?-g:0],voxel:b};Q<p?Q<I?(l+=v,a=Q,Q+=h,M=0):(s+=g,a=I,I+=B,M=2):p<I?(c+=u,a=p,p+=w,M=1):(s+=g,a=I,I+=B,M=2)}return null}}]),e}();w.faces=[{uvRow:0,dir:[-1,0,0],corners:[{pos:[0,1,0],uv:[0,1]},{pos:[0,0,0],uv:[0,0]},{pos:[0,1,1],uv:[1,1]},{pos:[0,0,1],uv:[1,0]}]},{uvRow:0,dir:[1,0,0],corners:[{pos:[1,1,1],uv:[0,1]},{pos:[1,0,1],uv:[0,0]},{pos:[1,1,0],uv:[1,1]},{pos:[1,0,0],uv:[1,0]}]},{uvRow:1,dir:[0,-1,0],corners:[{pos:[1,0,1],uv:[1,0]},{pos:[0,0,1],uv:[0,0]},{pos:[1,0,0],uv:[1,1]},{pos:[0,0,0],uv:[0,1]}]},{uvRow:2,dir:[0,1,0],corners:[{pos:[0,1,1],uv:[1,1]},{pos:[1,1,1],uv:[0,1]},{pos:[0,1,0],uv:[1,0]},{pos:[1,1,0],uv:[0,0]}]},{uvRow:0,dir:[0,0,-1],corners:[{pos:[1,0,0],uv:[0,0]},{pos:[0,0,0],uv:[1,0]},{pos:[1,1,0],uv:[0,1]},{pos:[0,1,0],uv:[1,1]}]},{uvRow:0,dir:[0,0,1],corners:[{pos:[0,0,1],uv:[0,0]},{pos:[1,0,1],uv:[1,0]},{pos:[0,1,1],uv:[0,1]},{pos:[1,1,1],uv:[1,1]}]}];var B=function(e){var t=new g.t({canvas:e}),A=32,i=new g.l(75,2,.1,1e3);i.position.set(-9.6,25.6,-9.6);var o=new h.a(i,e);o.target.set(16,A/3,16),o.update();var n=new g.n;n.background=new g.c("lightblue");var r=(new g.q).load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABACAYAAAD1Xam+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGAGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMDYtMTlUMTU6NDc6MDgrMDk6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTktMDYtMTlUMTU6NDc6MDgrMDk6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTA2LTE5VDE1OjQ3OjA4KzA5OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI2ZTk2MTM4LTNjMDctNDg1NS1iMzJkLWNiODEzYWY0OWEwMCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmI3NjBlMzNkLWM1MDMtMjg0MC1iMDM2LWM5NzNjOTlhMmZmMSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjg1MWQ5N2FkLTRhOTctNDkyZS05YzcxLWFmYWRkNGY4MmMyMyIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODUxZDk3YWQtNGE5Ny00OTJlLTljNzEtYWZhZGQ0ZjgyYzIzIiBzdEV2dDp3aGVuPSIyMDE5LTA2LTE5VDE1OjQ3OjA4KzA5OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjZlOTYxMzgtM2MwNy00ODU1LWIzMmQtY2I4MTNhZjQ5YTAwIiBzdEV2dDp3aGVuPSIyMDE5LTA2LTE5VDE1OjQ3OjA4KzA5OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6yxlNQAAAMxklEQVR42u1dLa9cVRSdn8APqKhAVDzxRAWipqICgUBUICqeQDQBgXiiAvMUH0lFDUmDIAjEEw2pQDQBA0kFIQhERQUCUYFAVg6zb2ZN1tvd+3zfuTPpbrIy995zzmOYuWvd/XX2rP69vLsG/j6/vX557+b0ytdTY6///Wf14uVn68fPPnwD9x/fWqfGNmvXf/1yuX75/KdmfH9xf31x9tH6zycXE54+Ol8//OzsCuQaxuVc5ss6gNdfu/Ne1fpfL+4244ezO914cPNkh49Pblw5t8Bz5Pjp5WUzvvr8Yn3znWsTPrh2fYIc33v33d05gGsYx7rb56cTcE/gnK/xddw/OP/txR/rL378VrDaHE+Q4/XmH4+9/vv+anO/TmNybfNvmvPg9xffCT598ksVsI7fbwtqv2+5F/m85/4TrJjgpQLA40JiIbm8eiSXYz2+HVt5xC4VBpBXPphnjx9MEGKCvCwMAEgPlKzHF8brb9w/7SLyw9unXeSX9bWk1wCRW3B2996OyAyQXf67Ai0AeIUAyP0DgOw4Z7LzPFxjom8FYDr+4MtPrpB/A7lfdyKAdSD0o39eFQmBFowRAqBJLXj1/JF5feT9I1ilnvD//XqWtAJkXEhskZ8tAE8cNnAF4Penj4uEgcmrn+ogMBPfG0+tly9KyC4QC4HH8UWMQO5vCWH1NSZaCVgQYAGMEAA81Zns8srHOQHQFoCcswDAGuBrSgCuvIoIgPx0L6/w9GcB8Aieu94rAN73v7Nkafz89MS8Z2YRAPnAUgKA8bksgFLIh6SJC3ICPM7ktcb1eiG9XBfia/ILYAHUkFCQIrtFdO9G4aesJrm+boEFQAgtsM71mBYAJrclAEx6SwC0aW8JgHVNSJwSgA1g/k/k1y5C7kmfcxH4vZ3cPVnXnlvfr0X0HQY/dEYIQHUMQMQA4uA9/T0LQANKycRln12Ps79vjdeuZwEo9ftZAED2nBnvAeSSm4Z9bpBfX9cwBGAl13Csz/X8lADo96NjBRwDsJ72lihkYgA43gkACA/ysziMiAGA1PJ67b0b69pzkH163dxn8lqD3hhUUgBScQCMbwjeFAQU8lsWAIgvpn6JCMC01wE7+PN6XK5ZMQGMy1O+Zr0WgCsBmy1ZLL+dBaAHfAMxQH6BvH8e4/ma0JtzTfjdOY5TAsAk10FATwAs0z4XGASJ2M+3CG4JBM/Jmfg5VwCkBplrz0uQEga+50pcAp6TtAAsWHNGWwBCeiF/qQDAd9dPb5CXg3ZWTMBbbwX9rPUpAUgF7lJmXEssIGdKen9zpACA2Nr1yAmAZ+6XZAZ0kE9EgMlvxQjYQij19b0gIUjNwlpzLsG+ku8fQUH9vfYGoUcIQJbkiTTgqtcFsHx6/XTXc3IxgVTQT6+3zPocSueWxAJKSJ5aP4cAeEFAK2OQigF4AsDzrCCf+P2OAKx0fKA3BmD57FfM+sR47vvidVZQkIncFQMAsa00n5UmZBFIWQCeOJRkAVKRfz4XYlo+uya4lcsHMCaEx3od9PPW9wYB50gbynsu/Rv7FACvDgD3SEkdgLYUtgIw3cdiDWzJvxMADhKiVgDkF/TGAOb4/hDoQzowtX5IHUCPAHgxgBILoFQAUilCkBImP+fxddDO8vlB/Jr1uxSOygK0BAFHFAO13Gzy/zVSAKw6AK8QyHIBvKKfVGpQfGkU/+gnO4uAXEchkFyX8W1B0Ko3BjDq+yrJ+3si0Z0GtASARYCvlQpASSVgqwDoOgAu4LHy+Jr8bM7XrtfuwRwxgJpYwCRWBfO91NIoAbDqAGoFIBfxtzIDTH5LBEB+xAjkGjIDLAA5X98TiJ7vDwG+lImfW98tAJrcfG5Bz+FCICvXnykFXtU++XVsoMSn17EAbc7Xrod7YKUBa7MAI4J+Hrm9v3vFtxycBWCycxAwVQdQmvO3rIKUAIDoHCPQmYERMYAaX75ZKAbl/d+IAegne0oErDmwALxCoNIsQK7010sPypPb8+mtPD7GuPQXN1PL+l4LwErt1aQHzbSRkRaU927Nm1MAOAbQUgdQKwAc3ecnPWIEVmCwJwYg1kLp518DWARWKhCuwrA6ACZ1SgS8eSkLIBUE1HUAuai/lx5kf57TeDDZvdp+Jj+b9CXrETPQAtCSBRhRB1By43ljc9YBWFkArw6gtBJQ1wFYMQDt/6MQyBKA3hhAD9FbgAfSsDoATejLO6cu2a2xlhhArhLQswosF8AK6pXW/iPwB5O+Zf2IUuCa0t8a81Cvs+amBGB73FwHUFoIhExALuWXEYAV+f5vEN3LDPTuBZjbxEcWwBvvrgMQUjPkZtTXUmM9QcARewFq8/xWFWDNeqQKgZF12T1CgMh+rd+pNwPxVl8+ts5zaUBLAKw6gNKqPwFnAAwBSKYALctgRAxglK+vg4C59TlxqNoLkNrym9oqvP1Qm/G29wPo3c8/oh/AXLsBaywAnQJMpQFVDGDRfgBP/vp5/cl336zl9f3zr6fjGhxMP4AU0T1hgACwD1djAcjat70fQO9+/kPoB4B0VO6z0OMsACB3iQDw+dL9AGoJL/9YKA6mH4BH9lyjECGxfFEgOgcCPQHAtZQAHEs/gF4BkCdjz37+3vUQAGz39bb9WmNyjE1HKEsujXLL5ybvXRM6FwPQYrB0P4Ba8oulwCKweD8Afqp7+X6rQAjHEAAQ3usHYM1JCcCx9QOoCQRqC0ATmffzlxK8dT0LgI4FMNGtMUsASp7+EACxACzTP5UF0K7A0v0AagTAchcW7wfg5f1TAsDXWQD46W5ZANpK8ATgGPsBQAA41ecdawvAAsjbitL1WgBK+gDyGnYBSiwB+bwgACIeqW45KQE4lH4AKfO+RAAW7wfglQHjunzIXk2AtgBAbHxx3BLMihNYAnCs/QBYAHLHlgvQQ+6e9ZYAeD6/JQDyNywB8FweFgBZmyJ3zgXYbgdetB9AyrwvweL9ADxiC2CaeeNaALQlAAHwAoGeABxjP4BeF6DGrC9FyXovzWf5/NoSYBdAPgcWABCdfX79mrMArCCgIQCL9gNIPd1LcFD9AJj4/BQXeBuFkAVg4Imv/4bGCBfgUPoB9LgArSSX+b3rvSe+kPv0+smE1BwrBoBXTXjLBTA2iF0515WCeu7S/QB6BeAg+gFYAUAr5eIJALdrZsASsCAiURoEPIZ+AK0uQG3pb0nar2Z9TgDev3VnmABYFoAmvSY/in8sgZjczoX7AdSmAUvqAPbaD+DQXIBj7QfQ6gLsi+i5OoBSkz+XBuRX3GSeJTDCBVi6H0Br/l8LwGL9AFJBQMv0bwkC8jVOC45IAx5KP4BWF8DK0ef8+VyOv2a9DgLqlJ9+4pcGAa2a9TmCgEv3A2jN/+9cgKX7AcyZBtS7AbUlUCsAh9wPoNUFSJHTI7Se37PeEoAUSuoAPHNTC4CuBGxMAy7aD6A1/88xgIPoBzBXIZDuFeAVAh17P4BWF6Anh+/Nq1nfWwjEdQAlN7AXA+goBFq0H0CvACzeD+BQSoGPvR9ATylwCXFLSN2y3koD6l1/3ph2AUpvPC0APaXAS/cDKCkA6q0DmLUfwKFuBjq2fgBz7AXQJrw1t3f9iM1ANeYq1wWM2Ay0dD+A1gIgdgEW7Qew9Hbgt70fQA1ZU+RuXV/i96cw6ufBO7YDL9oPoHc78MH2Ayj5URD8LsDmizKxDQKa16UjsCD6AUQ/gOgHcAD9AITYaPmVEgCZo38azDLxe9uCRz+A6AcQ/QD22A9AiC03irx6Pw1mzUHQDwG6Vy+eJ4F5WyGIfgDRDyD6ASzZDwAfjCcA/CvBjgCsIAAg+bbj7xtgEcgJQPQDiH4A0Q9gD/0AUgIgYykBkLGtX58lvxaBlABEP4DoBxD9APbUD2CkAOTIzyLgCUD0A4h+ANEPYI/9AHQQkAN8TH5rTq8AWG3Box9A9AOIfgAL9QPwMgCpOfh58FoBSP0wSPQDiH4A0Q9gj/0AOMVXAhYBNP+oFYDtHoHoBxD9AKIfwJL9ANi0L31ysBuALMCoGED0A4h+ANEPYI/9ALQFUEJ+tgBGBwGjH0D0A4h+AHvsB6B3/MHMt4jP5AfmSANGP4DoBxD9APbcD0D/NLj2+605LAAthUAcA4h+ANEPIPoBLNAPwPspcK8NmAYLQG0pMGcBoh9A9AOIfgAL9APQhIaZb8EagwCkGoN647ksQPQDiH4A0Q9g5n4A2tSXm8ZL/1ljvMVXb/uVrcDWdVoT/QCiH0D0A1iyH0BvQ49AIHC8iA8hEAgBCAQCIQCBQCAEIBAIhAAEAoEQgEAgEAIQCARCAAKBQAhAIBAIAQgEAiEAgUAgBCAQCIQABAKBEIBAIBACEAgEDhb/AwMQPePoeIE6AAAAAElFTkSuQmCC",I);function a(e,t,A){var i=new g.d(16777215,1);i.position.set(e,t,A),n.add(i)}r.magFilter=g.k,r.minFilter=g.k,a(-1,2,4),a(1,-1,-2);var l=new w({cellSize:A,tileSize:16,tileTextureWidth:256,tileTextureHeight:64}),c=new g.j({map:r,side:g.e,alphaTest:.1,transparent:!0}),s={};function B(e,t,i){var o=Math.floor(e/A),r=Math.floor(t/A),a=Math.floor(i/A),v=l.computeCellId(e,t,i),u=s[v],h=u?u.geometry:new g.b,w=l.generateGeometryDataForCell(o,r,a),B=w.positions,d=w.normals,f=w.uvs,D=w.indices;h.setAttribute("position",new g.a(new Float32Array(B),3));h.setAttribute("normal",new g.a(new Float32Array(d),3));h.setAttribute("uv",new g.a(new Float32Array(f),2)),h.setIndex(D),h.computeBoundingSphere(),u||((u=new g.i(h,c)).name=v,s[v]=u,n.add(u),u.position.set(o*A,r*A,a*A))}var d=[[0,0,0],[-1,0,0],[1,0,0],[0,-1,0],[0,1,0],[0,0,-1],[0,0,1]];function f(e,t,A){var i,o={},n=Object(u.a)(d);try{for(n.s();!(i=n.n()).done;){var r=i.value,a=e+r[0],c=t+r[1],s=A+r[2],v=l.computeCellId(a,c,s);o[v]||(o[v]=!0,B(a,c,s))}}catch(g){n.e(g)}finally{n.f()}}function D(e,t,i){for(var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,n=e*A,r=t*A,a=i*A,c=0;c<A;++c)for(var s=0;s<A;++s)for(var v=0;v<A;++v){var u=(Math.sin(v/A*Math.PI*2)+Math.sin(s/A*Math.PI*3))*(A/6)+16;c<u&&l.setVoxel(n+v,r+c,a+s,o||Q(1,17))}}function Q(e,t){return Math.floor(Math.random()*(t-e)+e)}D(0,0,0),D(1,0,0,2),D(-1,0,0,3),D(0,0,-1,4),D(0,0,1,5),f(0,0,0),f(31,0,31);var p=!1;function I(){p=void 0,function(e){var t=e.domElement,A=window.innerWidth,i=window.innerHeight,o=t.width!==A||t.height!==i;return o&&e.setSize(A,i,!1),o}(t)&&(i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix()),o.update(),t.render(n,i)}function M(){p||(p=!0,requestAnimationFrame(I))}function b(t){var A=function(t){var A=e.getBoundingClientRect();return{x:(t.clientX-A.left)*e.width/A.width,y:(t.clientY-A.top)*e.height/A.height}}(t),o=A.x/e.width*2-1,n=A.y/e.height*-2+1,r=new g.s,a=new g.s;r.setFromMatrixPosition(i.matrixWorld),a.set(o,n,1).unproject(i);var c=l.intersectRay(r,a);if(c){var s=t.shiftKey?0:1,u=c.position.map((function(e,t){return e+c.normal[t]*(s>0?.5:-.5)}));l.setVoxel.apply(l,Object(v.a)(u).concat([s])),f.apply(void 0,Object(v.a)(u)),M()}}I();var m={x:0,y:0};function C(e){m.moveX+=Math.abs(m.x-e.clientX),m.moveY+=Math.abs(m.y-e.clientY)}function x(e){m.moveX<5&&m.moveY<5&&b(e),window.removeEventListener("pointermove",C),window.removeEventListener("pointerup",x)}e.addEventListener("pointerdown",(function(e){e.preventDefault(),function(e){m.x=e.clientX,m.y=e.clientY,m.moveX=0,m.moveY=0}(e),window.addEventListener("pointermove",C),window.addEventListener("pointerup",x)}),{passive:!1}),e.addEventListener("touchstart",(function(e){e.preventDefault()}),{passive:!1}),o.addEventListener("change",M),window.addEventListener("resize",M)},d=A(8),f=function(e){Object(c.a)(A,e);var t=Object(s.a)(A);function A(e){var i;return Object(a.a)(this,A),(i=t.call(this,e)).canvasRef=o.a.createRef(),i}return Object(l.a)(A,[{key:"componentDidMount",value:function(){B(this.canvasRef.current)}},{key:"render",value:function(){return Object(d.jsx)("canvas",{className:"viewportCanvas",ref:this.canvasRef})}}]),A}(o.a.Component),D=function(){return Object(d.jsx)(f,{})};r.a.render(Object(d.jsx)(o.a.StrictMode,{children:Object(d.jsx)(D,{})}),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.25966c42.chunk.js.map