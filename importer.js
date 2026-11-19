(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./vendor/xlsx.full.min.js'));else root.QuoteImport=factory(root.XLSX);})(globalThis,function(X){
'use strict';
// Keep cell values and formats until the user has mapped their meaning.
function read(data,isCSV=false){return X.read(isCSV?new TextDecoder('utf-8',{fatal:true}).decode(data).replace(/^\uFEFF/,''):data,{type:isCSV?'string':'array',raw:true,cellDates:false,cellNF:true,cellFormula:true,cellHTML:false,sheetRows:552});}
function range(sheet){const r=X.utils.decode_range(sheet['!fullref']||sheet['!ref']||'A1');if(r.e.r>=550||r.e.c>=100)throw Error('Import up to 550 worksheet rows and 100 columns. Remove unused formatted rows/columns or split the file.');return r;}
function preview(book,name){const sheet=book.Sheets[name],r=range(sheet);return Array.from({length:r.e.r+1},(_,row)=>Array.from({length:r.e.c+1},(_,col)=>{const c=sheet[X.utils.encode_cell({r:row,c:col})];return c?c.w??String(c.v??''):'';}));}
function iso(y,m,d){const s=`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`,dt=new Date(s+'T00:00:00Z');if(y<1900||y>9999||!Number.isFinite(dt.getTime())||dt.toISOString().slice(0,10)!==s)throw Error('Invalid calendar date: '+s);return s;}
function date(value,{date1904=false,dateOrder='auto',excel=false}={}){
 if(value===null||value===undefined||String(value).trim()==='')return '';
 if(typeof value==='number'&&excel){if(!Number.isFinite(value)||value<0||(!date1904&&Math.floor(value)===60))throw Error('Invalid Excel date serial');const d=X.SSF.parse_date_code(value,{date1904});if(!d)throw Error('Invalid Excel date serial');return iso(d.y,d.m,d.d);}
 const s=String(value).trim();let a=s.match(/^(\d{4})[-/.年](\d{1,2})[-/.月](\d{1,2})日?$/);if(a)return iso(+a[1],+a[2],+a[3]);
 a=s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);if(a){let [,one,two,year]=a.map(Number);if(dateOrder==='auto'){if(one>12&&two<=12)dateOrder='dmy';else if(two>12&&one<=12)dateOrder='mdy';else if(one===two)dateOrder='mdy';else throw Error('Ambiguous date "'+s+'": choose day/month/year or month/day/year in the import options.');}return dateOrder==='dmy'?iso(year,two,one):iso(year,one,two);}
 throw Error('Use YYYY-MM-DD or a four-digit-year date. Numeric Excel dates must be numeric cells in an XLSX file.');
}
function rows(book,name,header,map,options={}){
 const sheet=book.Sheets[name],r=range(sheet),result=[],used=new Set(),warnings=new Set();
 for(const [field,col] of Object.entries(map)){if(col<0)continue;if(used.has(col))throw Error('Each source column can be mapped only once. Check '+field+'.');used.add(col);}
 for(let row=header+1;row<=r.e.r;row++){
  const out=[];let hasValue=false;
  for(const [field,col] of Object.entries(map)){if(col<0)continue;const addr=X.utils.encode_cell({r:row,c:col}),cell=sheet[addr];let value=cell?.v??'';
   if(cell?.t==='e')throw Error(addr+': spreadsheet error; correct the source cell before importing.');
   if(cell?.f){if(cell.v===undefined)throw Error(addr+': formula has no cached result. Recalculate and save the workbook first.');warnings.add('Formula results are cached values. Recalculate and save the source workbook before import.');}
   try{
    if(field==='validUntil')value=date(value,{date1904:!!book.Workbook?.WBProps?.date1904,dateOrder:options.dateOrder,excel:!options.isCSV});
    else if(['sku','product','specification','reference','name','unit'].includes(field)){if(cell?.t==='n'&&cell.z&&/^0+$/.test(cell.z))value=X.utils.format_cell(cell);else value=String(value);}
    else if(['tax','discount','prepay'].includes(field)&&cell?.t==='n'&&/%/.test(cell.z||''))value=String(Number((value*100).toPrecision(15)))+'%';
    else if(typeof value==='number')value=Number(value.toPrecision(15));
   }catch(err){throw Error(addr+' ('+field+'): '+err.message);}
   out[col]=value;if(String(value).trim())hasValue=true;
  }
  if(hasValue){out.sourceRow=row+1;result.push(out);}
 }
 return {rows:result,warnings:[...warnings]};
}
return {read,preview,date,rows};
});
