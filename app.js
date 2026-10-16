const $ = (s) => document.querySelector(s);
const visual = $("#visual"), controls = $("#controls"), statusBox = $("#status");
let view = "stack", stack = [], queue = [], linked = [], numbers = [8,3,6,1,9], searchTarget = "6", sortNumbers = [8,3,6,1,9];

const info = {
  stack: ["LIFO • LAST IN, FIRST OUT","Stack Visualizer","The last item you add is the first item removed.","Stack operations happen at the top.","Push: O(1) · Pop: O(1)"],
  queue: ["FIFO • FIRST IN, FIRST OUT","Queue Visualizer","The first item added is the first item removed.","New items join the rear; removals happen at the front.","Enqueue: O(1) · Dequeue: O(1)"],
  list: ["NODES • LINKS","Linked List Visualizer","Each node stores a value and points to the next node.","Follow the arrows from head to tail.","Search: O(n) · Insert at head: O(1)"],
  search: ["LINEAR SEARCH","Searching Visualizer","Check each item one by one until the target is found.","Linear search works even if the array is unsorted.","Time: O(n) · Space: O(1)"],
  sort: ["BUBBLE SORT","Sorting Visualizer","Compare neighboring values and swap them when needed.","After each pass, the largest remaining value moves to the end.","Time: O(n²) · Space: O(1)"]
};
function setStatus(s){statusBox.textContent=s}
function node(v){const d=document.createElement("div");d.className="node";d.textContent=v;return d}
function empty(msg="No values yet. Add a value to start."){visual.innerHTML=`<div class="empty">${msg}</div>`}
function addButton(label, fn, secondary=false){const b=document.createElement("button");b.className="action"+(secondary?" secondary":"");b.textContent=label;b.onclick=fn;controls.appendChild(b)}
function addInput(placeholder,value="",type="text"){const i=document.createElement("input");i.placeholder=placeholder;i.value=value;i.type=type;i.setAttribute("aria-label",placeholder);controls.appendChild(i);return i}
function render(){
  const x=info[view];$("#topicLabel").textContent=x[0];$("#topicTitle").textContent=x[1];$("#topicDescription").textContent=x[2];$("#notice").textContent=x[3];$("#complexity").textContent=x[4];
  controls.innerHTML="";visual.innerHTML="";
  if(view==="stack"){
    if(!stack.length)empty();else{const wrap=document.createElement("div");wrap.className="stack-view";stack.forEach(v=>wrap.appendChild(node(v)));visual.appendChild(wrap)}
    const input=addInput("Enter a number","");addButton("Push",()=>{const v=input.value.trim();if(!v)return setStatus("Please enter a value first.");if(stack.length>=8)return setStatus("Stack is full (demo limit: 8).");stack.push(v);setStatus(`Push(${v}): value added to the top of the stack.`);render()});addButton("Pop",()=>{if(!stack.length)return setStatus("Stack Underflow: nothing to pop.");const v=stack.pop();setStatus(`Pop: removed ${v} from the top.`);render()},true);addButton("Peek",()=>setStatus(stack.length?`Peek: top value is ${stack[stack.length-1]}.`:"Stack is empty."));
  } else if(view==="queue"){
    if(!queue.length)empty();else{queue.forEach((v,i)=>{if(i){const a=document.createElement("span");a.className="arrow";a.textContent="→";visual.appendChild(a)}visual.appendChild(node(v))})}
    const input=addInput("Enter a number","");addButton("Enqueue",()=>{const v=input.value.trim();if(!v)return setStatus("Please enter a value first.");if(queue.length>=8)return setStatus("Queue is full (demo limit: 8).");queue.push(v);setStatus(`Enqueue(${v}): added to the rear of the queue.`);render()});addButton("Dequeue",()=>{if(!queue.length)return setStatus("Queue is empty; nothing to remove.");const v=queue.shift();setStatus(`Dequeue: removed ${v} from the front.`);render()},true);addButton("Front",()=>setStatus(queue.length?`Front value: ${queue[0]}.`:"Queue is empty."));
  } else if(view==="list"){
    if(!linked.length)empty("Linked list is empty. Add your first node.");else linked.forEach((v,i)=>{visual.appendChild(node(v));if(i<linked.length-1){const a=document.createElement("span");a.className="arrow";a.textContent="→";visual.appendChild(a)}});
    const input=addInput("Node value","");addButton("Add at end",()=>{const v=input.value.trim();if(!v)return setStatus("Enter a node value first.");if(linked.length>=10)return setStatus("Demo limit: 10 nodes.");linked.push(v);setStatus(`Inserted node ${v} at the end of the linked list.`);render()});addButton("Delete first",()=>{if(!linked.length)return setStatus("List is empty.");const v=linked.shift();setStatus(`Deleted first node (${v}).`);render()},true);addButton("Find",()=>{const v=input.value.trim();const i=linked.indexOf(v);setStatus(i>=0?`Found ${v} at position ${i+1}.`:`${v||"Value"} not found in the list.`)});
  } else if(view==="search"){
    const row=document.createElement("div");row.style.cssText="display:flex;align-items:center;gap:9px;flex-wrap:wrap;justify-content:center";numbers.forEach(v=>row.appendChild(node(v)));visual.appendChild(row);
    const input=addInput("Target value",searchTarget,"number");addButton("Linear Search",()=>{searchTarget=input.value;const idx=numbers.indexOf(Number(searchTarget));const items=[...visual.querySelectorAll(".node")];items.forEach(n=>n.classList.remove("found"));if(idx<0){setStatus(`Target ${searchTarget} not found after checking ${numbers.length} values.`);return}items[idx].classList.add("found");setStatus(`Found ${searchTarget} at index ${idx} (position ${idx+1}) after checking ${idx+1} value(s).`)});
    addButton("New example",()=>{numbers=Array.from({length:5},()=>Math.floor(Math.random()*19)+1);render();setStatus("New array generated. Enter a target and search.")},true);
  } else if(view==="sort"){
    drawBars(sortNumbers);
    addButton("Bubble Sort step",()=>bubbleStep(),false);addButton("Reset example",()=>{sortNumbers=[8,3,6,1,9];render();setStatus("Sorting example reset.")},true);addButton("Sort all",()=>{sortNumbers.sort((a,b)=>a-b);render();setStatus("Finished: array sorted in ascending order.")});
  }
}
function drawBars(arr){visual.innerHTML="";const wrap=document.createElement("div");wrap.className="bar-wrap";wrap.style.width="100%";wrap.style.justifyContent="center";arr.forEach(v=>{const b=document.createElement("div");b.className="bar";b.style.height=(25+v*12)+"px";b.textContent=v;wrap.appendChild(b)});visual.appendChild(wrap)}
let bubbleI=0,bubbleJ=0;
function bubbleStep(){if(bubbleI>=sortNumbers.length-1){setStatus("Sorting complete. All values are in ascending order.");return}if(bubbleJ>=sortNumbers.length-bubbleI-1){bubbleJ=0;bubbleI++;if(bubbleI>=sortNumbers.length-1){sortNumbers.sort((a,b)=>a-b);render();setStatus("Sorting complete!");return}}const a=sortNumbers[bubbleJ],b=sortNumbers[bubbleJ+1];let msg=`Compare ${a} and ${b}. `;if(a>b){sortNumbers[bubbleJ]=b;sortNumbers[bubbleJ+1]=a;msg+=`Swap them: ${b} comes before ${a}.`}else msg+="No swap needed.";bubbleJ++;drawBars(sortNumbers);setStatus(msg+` (Pass ${bubbleI+1})`)}
function reset(){stack=[];queue=[];linked=[];numbers=[8,3,6,1,9];searchTarget="6";sortNumbers=[8,3,6,1,9];bubbleI=0;bubbleJ=0;render();setStatus("Reset complete. Ready for a new demonstration.")}
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{view=b.dataset.view;document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t===b));bubbleI=0;bubbleJ=0;render();setStatus("Ready. Try an operation to see how it works.")}));
$("#resetBtn").addEventListener("click",reset);
render();