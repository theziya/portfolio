import{C as c}from"./constants-B-HSxjv-.js";class g{constructor(){this.root=null,this.projectData=null,this.initialized=!1}async initialize(t){this.initialized||(this.projectData=t,this.root=this._buildFileTree(),this.initialized=!0)}_buildFileTree(){return{type:"directory",name:"",path:"/",children:{base:this._buildBaseDirectory(),projects:this._buildProjectsDirectory(),meta:this._buildMetaDirectory()}}}_buildBaseDirectory(){return{type:"directory",name:"base",path:"/base",children:{about:{type:"file",name:"about",path:"/base/about",content:this._getAboutContent()},contact:{type:"file",name:"contact",path:"/base/contact",content:this._getContactContent()},resume:{type:"file",name:"resume",path:"/base/resume",content:"[Resume Link - Opens in browser]",url:c.RESUME_URL}}}}_buildProjectsDirectory(){const t={type:"directory",name:"projects",path:"/projects",children:{}};return this.projectData&&this.projectData.forEach(e=>{const i=this._generateSlug(e.title),n={type:"directory",name:i,path:`/projects/${i}`,projectId:e.id,children:{overview:{type:"file",name:"overview",path:`/projects/${i}/overview`,content:this._formatProjectOverview(e)},architecture:{type:"file",name:"architecture",path:`/projects/${i}/architecture`,content:this._formatProjectArchitecture(e)},"decisions.log":{type:"file",name:"decisions.log",path:`/projects/${i}/decisions.log`,content:this._formatProjectDecisions(e)},impact:{type:"file",name:"impact",path:`/projects/${i}/impact`,content:this._formatProjectImpact(e)}}};e.attachments&&e.attachments.length>0&&(n.children.attachments=this._buildAttachmentsDirectory(e,i)),t.children[i]=n}),t}_buildMetaDirectory(){return{type:"directory",name:"meta",path:"/meta",children:{"system.info":{type:"file",name:"system.info",path:"/meta/system.info",content:this._getSystemInfo()},version:{type:"file",name:"version",path:"/meta/version",content:`Portfolio v2.0
Last Updated: January 2026`}}}}resolvePath(t,e="/"){if(!this.initialized)throw new Error("Filesystem not initialized");const n=this._resolveAbsolutePath(t,e).split("/").filter(s=>s.length>0);if(n.length===0)return this.root;let r=this.root;for(const s of n)if(r.type!=="directory"||!r.children||(r=r.children[s],!r))return null;return r}listDirectory(t,e="/"){const i=this.resolvePath(t,e);if(!i)throw new Error(`path not found: ${t}`);if(i.type!=="directory")throw new Error(`not a directory: ${t}`);const n=[];for(const[r,s]of Object.entries(i.children||{}))n.push({name:r,type:s.type,path:s.path});return n.sort((r,s)=>r.type!==s.type?r.type==="directory"?-1:1:r.name.localeCompare(s.name))}readFile(t,e="/"){const i=this.resolvePath(t,e);if(!i)throw new Error(`path not found: ${t}`);if(i.type!=="file")throw new Error(`not a file: ${t}`);return i.content||""}getTree(t="/",e=3,i="/"){const n=this.resolvePath(t,i);if(!n)throw new Error(`path not found: ${t}`);const r=[];return this._buildTreeLines(n,"",!0,e,0,r),r.join(`
`)}_buildTreeLines(t,e,i,n,r,s){if(r>n)return;const o=i?"└── ":"├── ",a=t.name||"/",h=t.type==="directory"?"/":"";if(r>0?s.push(e+o+a+h):s.push(a+h),t.type==="directory"&&t.children&&r<n){const u=Object.entries(t.children);u.forEach(([_,p],m)=>{const f=m===u.length-1,y=r===0?"":e+(i?"    ":"│   ");this._buildTreeLines(p,y,f,n,r+1,s)})}}search(t){if(!t||t.trim().length===0)throw new Error("search keyword required");const e=[],i=t.toLowerCase();return this._searchNode(this.root,i,e),e}_searchNode(t,e,i){if(t.type==="file"&&t.content){const n=t.content.toLowerCase();if(n.includes(e)){const r=n.indexOf(e),s=Math.max(0,r-50),o=Math.min(n.length,r+e.length+50),a=t.content.substring(s,o);i.push({path:t.path,type:"file",snippet:(s>0?"...":"")+a+(o<n.length?"...":"")})}}if(t.type==="directory"&&t.children)for(const n of Object.values(t.children))this._searchNode(n,e,i)}_resolveAbsolutePath(t,e){if(t.startsWith("/"))return this._normalizePath(t);const i=e.split("/").filter(r=>r.length>0),n=t.split("/").filter(r=>r.length>0);for(const r of n)r!=="."&&(r===".."?i.pop():i.push(r));return"/"+i.join("/")}_normalizePath(t){return"/"+t.split("/").filter(i=>i.length>0).join("/")}_generateSlug(t){return t.toLowerCase().split("—")[0].trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}_getAboutContent(){return`${c.NAME}
${c.ROLE}

I build production systems with a focus on architectural clarity, maintainability, and long-term scalability. My work spans full-stack development, frontend architecture, real-time systems, and product ownership across fintech, logistics, and SaaS domains.

I care about systems thinking, product judgment, and delivering work that lasts.`}_getContactContent(){return`Contact Information:

Email: ${c.EMAIL}
GitHub: ${c.GITHUB_URL}
LinkedIn: ${c.LINKEDIN_URL}
Location: Kerala, India`}_getSystemInfo(){return`Portfolio System Information

Technology Stack:
- Vanilla JavaScript (ES6+)
- Vite (Build Tool)
- GSAP (Animations)
- LoconativeScroll (Smooth Scrolling)
- SCSS (Styling)

Architecture:
- Two-page application (index.html, project.html)
- URL-based routing with query parameters
- Centralized data model (project-data.json)
- Direct DOM manipulation
- Theme preference in localStorage

Console Mode:
- Read-only virtual filesystem
- Lazy-loaded module
- Zero impact on initial page load`}_formatProjectOverview(t){let e=`${t.title}
`;return e+=`${"=".repeat(t.title.length)}

`,e+=`Role: ${t.role}

`,e+=`${t.description}

`,t.problem_statement&&(e+=`Problem Statement:
${t.problem_statement}
`),e}_formatProjectArchitecture(t){let e=`Architecture - ${t.title}
`;return e+=`${"=".repeat(t.title.length+15)}

`,t.architecture_image&&(e+=`Architecture Diagram: /public/${t.architecture_image}

`),t.technical_highlights&&(e+=`Technical Highlights:
`,t.technical_highlights.forEach((i,n)=>{e+=`${n+1}. ${i}
`})),e}_formatProjectDecisions(t){let e=`Design Decisions - ${t.title}
`;return e+=`${"=".repeat(t.title.length+18)}

`,t.design_decisions&&t.design_decisions.forEach((i,n)=>{e+=`[${n+1}] ${i}

`}),e}_formatProjectImpact(t){let e=`Impact Metrics - ${t.title}
`;return e+=`${"=".repeat(t.title.length+17)}

`,t.impact_metrics&&t.impact_metrics.forEach((i,n)=>{e+=`• ${i}
`}),e}_buildAttachmentsDirectory(t,e){const i={type:"directory",name:"attachments",path:`/projects/${e}/attachments`,children:{}};return t.attachments.forEach((n,r)=>{const s=n.url.toLowerCase().endsWith(".pdf"),o=s?"pdf":"jpg";let a=this._generateSlug(n.caption||`attachment-${r+1}`);a=`${a}.${o}`;let h=1,u=a;for(;i.children[a];)a=`${u.replace(`.${o}`,"")}-${h}.${o}`,h++;i.children[a]={type:"file",name:a,path:`/projects/${e}/attachments/${a}`,content:`Attachment: ${n.caption}
Type: ${s?"PDF Document":"Image"}
URL: ${n.url}

Use 'open' command to view.`,url:n.url}}),i}getProjectIdFromPath(t){const e=this.resolvePath(t);if(!e)return null;if(e.projectId)return e.projectId;const i=t.split("/").filter(n=>n.length>0);if(i.length>=2&&i[0]==="projects"){const n=i[1],r=this.resolvePath(`/projects/${n}`);return(r==null?void 0:r.projectId)||null}return null}getProjectPathById(t){if(!this.root||!this.root.children.projects)return null;const e=parseInt(t,10),i=this.root.children.projects.children;for(const n of Object.values(i))if(n.projectId===e)return n.path;return null}}class w{constructor(t){this.vfs=t,this.cwd="/",this.history=[],this.aliases={ls:"list",cd:"open",cat:"read",dir:"list",pwd:"cwd",quit:"exit"},this.commands={list:this.cmdList.bind(this),open:this.cmdOpen.bind(this),read:this.cmdRead.bind(this),tree:this.cmdTree.bind(this),search:this.cmdSearch.bind(this),help:this.cmdHelp.bind(this),clear:this.cmdClear.bind(this),cwd:this.cmdCwd.bind(this),exit:this.cmdExit.bind(this)}}execute(t){if(!t||t.trim().length===0)return{output:"",error:!1};const e=t.trim();if(this.history.push(e),this._containsShellFeatures(e))return{output:"Error: shell features are not supported. This console exposes a read-only portfolio system.",error:!0};const{command:i,args:n}=this._parseCommand(e),r=this.aliases[i]||i;if(!this.commands[r])return{output:`Error: unknown command: ${i}. Type 'help' for available commands.`,error:!0};try{const s=this.commands[r](n);return{output:s.output||"",error:!1,navigation:s.navigation||null,exit:s.exit||!1}}catch(s){return{output:`Error: ${s.message}`,error:!0}}}_parseCommand(t){const e=t.match(/(?:[^\s"]+|"[^"]*")+/g)||[],i=e[0]||"",n=e.slice(1).map(r=>r.replace(/^"|"$/g,""));return{command:i,args:n}}_containsShellFeatures(t){return["|",">","<","&&","||",";","`","$"].some(i=>t.includes(i))}cmdList(t){const e=t[0]||".";try{const i=this.vfs.listDirectory(e,this.cwd);return i.length===0?{output:"(empty directory)"}:{output:i.map(r=>{const s=r.type==="directory"?"/":"";return`${r.name}${s}`}).join(`
`)}}catch(i){throw i}}cmdOpen(t){if(t.length===0)return{output:`Current directory: ${this.cwd}`};const e=t[0];try{const i=this.vfs.resolvePath(e,this.cwd);if(!i)throw new Error(`path not found: ${e}`);if(i.type==="directory")return this.cwd=i.path,{output:`Changed directory to ${this.cwd}`};{const n=this.vfs.getProjectIdFromPath(i.path);return n?{output:`Opening project: ${i.path}`,navigation:{type:"project",projectId:n}}:i.url?{output:`Opening: ${i.path}`,navigation:{type:"url",url:i.url}}:{output:i.content||"(empty file)"}}}catch(i){throw i}}cmdRead(t){if(t.length===0)throw new Error("read requires a file path");const e=t[0];try{return{output:this.vfs.readFile(e,this.cwd)}}catch(i){throw i}}cmdTree(t){const e=t[0]||".",i=t[1]?parseInt(t[1],10):3;if(isNaN(i)||i<1)throw new Error("tree depth must be a positive number");try{return{output:this.vfs.getTree(e,i,this.cwd)}}catch(n){throw n}}cmdSearch(t){if(t.length===0)throw new Error("search requires a keyword");const e=t.join(" ");try{const i=this.vfs.search(e);if(i.length===0)return{output:`No results found for: ${e}`};const n=[`Found ${i.length} result(s) for: ${e}
`];return i.forEach((r,s)=>{n.push(`[${s+1}] ${r.path}`),n.push(`    ${r.snippet}`),s<i.length-1&&n.push("")}),{output:n.join(`
`)}}catch(i){throw i}}cmdHelp(t){return{output:`Console Mode - Available Commands

NAVIGATION:
  list [path]          List directory contents (alias: ls, dir)
  open <path>          Navigate to directory or open file (alias: cd)
  cwd                  Show current working directory (alias: pwd)

FILE OPERATIONS:
  read <path>          Read file contents (alias: cat)
  tree [path] [depth]  Display tree structure (default depth: 3)

SEARCH:
  search <keyword>     Search for keyword across all content

UTILITY:
  help                 Display this help message
  clear                Clear console output
  exit                 Close console (alias: quit)

PATH NOTATION:
  /                    Root directory
  .                    Current directory
  ..                   Parent directory
  /absolute/path       Absolute path from root
  relative/path        Relative to current directory

FILESYSTEM STRUCTURE:
  /base/               About, contact, resume
  /projects/           Project directories
  /meta/               System information

KEYBOARD SHORTCUTS:
  Ctrl+\`               Toggle console
  Ctrl+L               Clear screen
  Esc                  Close console
  ↑/↓                  Navigate command history
  Tab                  Autocomplete (coming soon)

NOTE: This is a read-only portfolio system. Shell features like pipes,
redirection, and command chaining are not supported.`}}cmdClear(t){return{output:"",clear:!0}}cmdCwd(t){return{output:this.cwd}}cmdExit(t){return{output:"Closing console...",exit:!0}}getHistory(){return[...this.history]}getCwd(){return this.cwd}setCwd(t){const e=this.vfs.resolvePath(t);return e&&e.type==="directory"?(this.cwd=e.path,!0):!1}getAutocompleteSuggestions(t){if(!t||t.trim().length===0)return[];const e=t.trim(),{command:i,args:n}=this._parseCommand(e);if(n.length===0&&!e.endsWith(" "))return[...Object.keys(this.commands),...Object.keys(this.aliases)].filter(o=>o.startsWith(i)).sort();const r=this.aliases[i]||i;if(this.commands[r]){const s=n[n.length-1]||"";return this._getPathSuggestions(s)}return[]}_getPathSuggestions(t){try{let e=this.cwd,i=t;if(t.includes("/")){const r=t.lastIndexOf("/"),s=t.substring(0,r+1);i=t.substring(r+1);const o=this.vfs.resolvePath(s,this.cwd);if(o&&o.type==="directory")e=o.path;else return[]}return this.vfs.listDirectory(e,this.cwd).filter(r=>r.name.startsWith(i)).map(r=>{const s=r.type==="directory"?"/":"";return r.name+s}).sort()}catch{return[]}}}class b{constructor(){this.vfs=new g,this.parser=null,this.isVisible=!1,this.container=null,this.outputArea=null,this.inputElement=null,this.promptElement=null,this.historyIndex=-1,this.initialized=!1}async initialize(t){this.initialized||(await this.vfs.initialize(t),this.parser=new w(this.vfs),this._createUI(),this._attachEventListeners(),this.initialized=!0,this._addOutput(this._getWelcomeMessage(),!1))}_createUI(){this.container=document.createElement("div"),this.container.className="console-mode",this.container.setAttribute("data-visible","false");const t=document.createElement("div");t.className="console-content",this.outputArea=document.createElement("div"),this.outputArea.className="console-output";const e=document.createElement("div");e.className="console-input-area",this.promptElement=document.createElement("span"),this.promptElement.className="console-prompt",this._updatePrompt(),this.inputElement=document.createElement("input"),this.inputElement.type="text",this.inputElement.className="console-input",this.inputElement.setAttribute("autocomplete","off"),this.inputElement.setAttribute("spellcheck","false"),e.appendChild(this.promptElement),e.appendChild(this.inputElement),t.appendChild(this.outputArea),t.appendChild(e),this.container.appendChild(t),document.body.appendChild(this.container)}_attachEventListeners(){this.inputElement.addEventListener("keydown",this._handleKeyDown.bind(this)),this.container.addEventListener("click",t=>{t.target===this.container&&this.hide()})}_handleKeyDown(t){switch(t.key){case"Enter":t.preventDefault(),this._executeCommand();break;case"ArrowUp":t.preventDefault(),this._navigateHistory(-1);break;case"ArrowDown":t.preventDefault(),this._navigateHistory(1);break;case"Tab":t.preventDefault(),this._handleAutocomplete();break;case"l":t.ctrlKey&&(t.preventDefault(),this._clearOutput());break;case"Escape":t.preventDefault(),this.hide();break}}_executeCommand(){const t=this.inputElement.value.trim();if(t.length===0)return;this._addOutput(`${this.promptElement.textContent}${t}`,!1,"command");const e=this.parser.execute(t);e.clear?this._clearOutput():e.output&&this._addOutput(e.output,e.error),e.navigation&&this._handleNavigation(e.navigation),e.exit&&setTimeout(()=>{this.hide()},300),this._updatePrompt(),this.inputElement.value="",this.historyIndex=-1,this._scrollToBottom()}_navigateHistory(t){const e=this.parser.getHistory();if(e.length!==0){if(this.historyIndex===-1)t<0&&(this.historyIndex=e.length-1,this.inputElement.value=e[this.historyIndex]);else{const i=this.historyIndex+t;i>=0&&i<e.length?(this.historyIndex=i,this.inputElement.value=e[this.historyIndex]):i<0&&(this.historyIndex=-1,this.inputElement.value="")}setTimeout(()=>{this.inputElement.setSelectionRange(this.inputElement.value.length,this.inputElement.value.length)},0)}}_handleAutocomplete(){const t=this.inputElement.value,e=this.parser.getAutocompleteSuggestions(t);if(e.length!==0)if(e.length===1){const i=t.split(" ");i[i.length-1]=e[0],this.inputElement.value=i.join(" ")}else{const i=e.join("  ");this._addOutput(i,!1),this._scrollToBottom()}}_handleNavigation(t){t.type==="project"?setTimeout(()=>{window.location.href=`/project.html?id=${t.projectId}`},500):t.type==="url"&&setTimeout(()=>{window.open(t.url,"_blank")},500)}_addOutput(t,e=!1,i="output"){const n=document.createElement("div");n.className=`console-line console-${i}`,e&&n.classList.add("console-error"),n.textContent=t,this.outputArea.appendChild(n)}_clearOutput(){this.outputArea.innerHTML=""}_updatePrompt(){const t=this.parser?this.parser.getCwd():"/";this.promptElement.textContent=`${t} $ `}_scrollToBottom(){setTimeout(()=>{this.outputArea.scrollTop=this.outputArea.scrollHeight},0)}_getWelcomeMessage(){return`Console Mode - Portfolio Filesystem

Type 'help' for available commands.
Type 'tree /' to see the filesystem structure.
Type 'list /projects' to see all projects.

Press Ctrl+\` or Esc to close.`}show(){if(!this.initialized){console.error("Console not initialized");return}this.isVisible=!0,this.container.setAttribute("data-visible","true"),document.body.style.overflow="hidden";const t=document.getElementById("js-console-toggle");t&&(t.checked=!0),setTimeout(()=>{this.inputElement.focus()},100)}hide(){this.isVisible=!1,this.container.setAttribute("data-visible","false"),this.inputElement.blur(),document.body.style.overflow="";const t=document.getElementById("js-console-toggle");t&&(t.checked=!1)}toggle(){this.isVisible?this.hide():this.show()}setCwd(t){this.parser&&this.parser.setCwd(t)&&this._updatePrompt()}getIsVisible(){return this.isVisible}}let d=null;async function v(l=null){return d||(d=new b,l&&await d.initialize(l)),d}async function $(l){document.addEventListener("keydown",async t=>{(t.ctrlKey||t.metaKey)&&t.key==="`"&&(t.preventDefault(),(await v(l)).toggle())})}export{b as ConsoleMode,v as getConsoleInstance,$ as setupConsoleShortcut};
