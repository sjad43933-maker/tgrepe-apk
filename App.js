import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const TEAMS = ["الكرمة","النفط","الشرطة","نوروز","الجولان","الزوراء","أربيل","الطلبة","دهوك","الميناء","غاز الشمال","ديالى","الغراف","القوة الجوية","زاخو","الكرخ","الموصل","الكهرباء","نفط ميسان","كربلاء"];

const BASE = [
{name:"الكرمة",p:13,w:9,d:3,l:1,gf:23,ga:10},
{name:"النفط",p:13,w:7,d:4,l:2,gf:15,ga:7},
{name:"الشرطة",p:13,w:6,d:6,l:1,gf:15,ga:7},
{name:"نوروز",p:13,w:6,d:5,l:2,gf:15,ga:6},
{name:"الجولان",p:13,w:6,d:5,l:2,gf:19,ga:12},
{name:"الزوراء",p:13,w:6,d:3,l:4,gf:17,ga:12},
{name:"أربيل",p:13,w:5,d:5,l:3,gf:16,ga:9},
{name:"الطلبة",p:13,w:4,d:7,l:2,gf:16,ga:15},
{name:"دهوك",p:13,w:4,d:6,l:3,gf:20,ga:16},
{name:"الميناء",p:13,w:4,d:5,l:4,gf:12,ga:13},
{name:"غاز الشمال",p:13,w:3,d:7,l:3,gf:9,ga:10},
{name:"ديالى",p:13,w:3,d:5,l:5,gf:15,ga:18},
{name:"الغراف",p:13,w:3,d:5,l:5,gf:9,ga:15},
{name:"القوة الجوية",p:13,w:2,d:7,l:4,gf:14,ga:14},
{name:"زاخو",p:13,w:3,d:4,l:6,gf:10,ga:17},
{name:"الكرخ",p:13,w:3,d:3,l:7,gf:16,ga:21},
{name:"الموصل",p:13,w:3,d:3,l:7,gf:13,ga:21},
{name:"الكهرباء",p:13,w:2,d:5,l:6,gf:9,ga:15},
{name:"نفط ميسان",p:13,w:1,d:6,l:6,gf:8,ga:19},
{name:"كربلاء",p:13,w:1,d:4,l:8,gf:11,ga:25},
];

const PAST = [
{round:13,home:"الكرمة",away:"نفط ميسان",hs:4,as:1},
{round:13,home:"نوروز",away:"كربلاء",hs:1,as:0},
{round:13,home:"الشرطة",away:"النفط",hs:2,as:1},
{round:13,home:"الزوراء",away:"الجولان",hs:0,as:3},
{round:13,home:"القوة الجوية",away:"الكرخ",hs:0,as:1},
{round:13,home:"الطلبة",away:"غاز الشمال",hs:2,as:2},
{round:13,home:"أربيل",away:"الغراف",hs:1,as:1},
{round:13,home:"ديالى",away:"الميناء",hs:0,as:0},
{round:13,home:"الموصل",away:"دهوك",hs:0,as:1},
{round:13,home:"الكهرباء",away:"زاخو",hs:2,as:1},
{round:14,home:"الغراف",away:"القوة الجوية",hs:2,as:3},
{round:14,home:"ديالى",away:"الكهرباء",hs:1,as:1},
{round:14,home:"غاز الشمال",away:"الكرخ",hs:1,as:0},
{round:12,home:"الكرمة",away:"دهوك",hs:1,as:0},
{round:12,home:"الميناء",away:"الكرمة",hs:2,as:1},
{round:11,home:"الكرمة",away:"النفط",hs:3,as:0},
{round:11,home:"ديالى",away:"الكرمة",hs:1,as:2},
{round:10,home:"الشرطة",away:"الكهرباء",hs:2,as:0},
{round:10,home:"الجولان",away:"الشرطة",hs:0,as:1},
{round:10,home:"الشرطة",away:"كربلاء",hs:1,as:1},
{round:9,home:"الزوراء",away:"الشرطة",hs:0,as:2},
{round:9,home:"نوروز",away:"زاخو",hs:1,as:0},
{round:9,home:"نوروز",away:"الميناء",hs:2,as:0},
{round:8,home:"نوروز",away:"ديالى",hs:0,as:0},
{round:8,home:"الجولان",away:"نوروز",hs:0,as:2},
{round:7,home:"غاز الشمال",away:"نوروز",hs:0,as:0},
{round:6,home:"النفط",away:"الكهرباء",hs:1,as:0},
{round:6,home:"الغراف",away:"النفط",hs:0,as:0},
{round:6,home:"النفط",away:"زاخو",hs:2,as:0},
{round:5,home:"الموصل",away:"النفط",hs:0,as:1},
{round:3,home:"الزوراء",away:"أربيل",hs:1,as:0},
{round:3,home:"القوة الجوية",away:"الشرطة",hs:1,as:1},
{round:3,home:"دهوك",away:"ديالى",hs:1,as:0},
{round:3,home:"الموصل",away:"الكرمة",hs:1,as:3},
{round:3,home:"الطلبة",away:"الميناء",hs:2,as:1},
{round:2,home:"الميناء",away:"كربلاء",hs:3,as:1},
];

function buildFuture(){
  let list = [];
  // ===== الجولة 14 - كاملة 10 مباريات - كلها قابلة للتعديل =====
  list.push(
    // الثلاثة الي ضفناها - هسه قابلة للتعديل مثل الباقيات
    {round:14,home:"الغراف",away:"القوة الجوية",hs:"2",as:"3"},
    {round:14,home:"ديالى",away:"الكهرباء",hs:"1",as:"1"},
    {round:14,home:"غاز الشمال",away:"الكرخ",hs:"1",as:"0"},
    // السبعة الباقية
    {round:14,home:"زاخو",away:"الشرطة",hs:"",as:""},
    {round:14,home:"الميناء",away:"كربلاء",hs:"",as:""},
    {round:14,home:"الزوراء",away:"الطلبة",hs:"",as:""},
    {round:14,home:"دهوك",away:"أربيل",hs:"",as:""},
    {round:14,home:"الجولان",away:"النفط",hs:"",as:""},
    {round:14,home:"نفط ميسان",away:"الموصل",hs:"",as:""},
    {round:14,home:"نوروز",away:"الكرمة",hs:"",as:""},
  );
  list.push(
    {round:15,home:"الكرخ",away:"أربيل",hs:"",as:""},
    {round:15,home:"الموصل",away:"زاخو",hs:"",as:""},
    {round:15,home:"نوروز",away:"الكرمة",hs:"",as:""},
    {round:15,home:"الشرطة",away:"نفط ميسان",hs:"",as:""},
    {round:15,home:"الطلبة",away:"ديالى",hs:"",as:""},
    {round:15,home:"الكهرباء",away:"القوة الجوية",hs:"",as:""},
    {round:15,home:"الغراف",away:"الزوراء",hs:"",as:""},
    {round:15,home:"النفط",away:"دهوك",hs:"",as:""},
    {round:15,home:"كربلاء",away:"غاز الشمال",hs:"",as:""},
    {round:15,home:"الميناء",away:"الجولان",hs:"",as:""},
  );
  list.push(
    {round:16,home:"الكرمة",away:"الكرخ",hs:"",as:""},
    {round:16,home:"الشرطة",away:"الموصل",hs:"",as:""},
    {round:16,home:"الطلبة",away:"الغراف",hs:"",as:""},
    {round:16,home:"نوروز",away:"ديالى",hs:"",as:""},
    {round:16,home:"القوة الجوية",away:"النفط",hs:"",as:""},
    {round:16,home:"الزوراء",away:"أربيل",hs:"",as:""},
    {round:16,home:"دهوك",away:"الميناء",hs:"",as:""},
    {round:16,home:"زاخو",away:"كربلاء",hs:"",as:""},
    {round:16,home:"الجولان",away:"غاز الشمال",hs:"",as:""},
    {round:16,home:"الكهرباء",away:"نفط ميسان",hs:"",as:""},
  );
  for(let r=17;r<=38;r++){
    for(let i=0;i<10;i++){
      let h = TEAMS[(i+r)%20];
      let a = TEAMS[(i+r+10)%20];
      if(h!==a) list.push({round:r,home:h,away:a,hs:"",as:""});
    }
  }
  return list;
}
const FUTURE_INIT = buildFuture();

export default function App(){
  const [tab,setTab] = useState('table');
  const [draft,setDraft] = useState(FUTURE_INIT);
  const [applied,setApplied] = useState([]);

  function calcTable(){
    let map={};
    BASE.forEach(t=>{ map[t.name]={...t,pts:t.w*3+t.d}; });
    applied.forEach(m=>{
      if(m.hs===""||m.as==="") return;
      let hs=parseInt(m.hs), as=parseInt(m.as);
      let h=map[m.home], a=map[m.away];
      if(!h||!a) return;
      h.p++; a.p++; h.gf+=hs; h.ga+=as; a.gf+=as; a.ga+=hs;
      if(hs>as){ h.w++; a.l++; h.pts+=3; }
      else if(hs<as){ a.w++; h.l++; a.pts+=3; }
      else { h.d++; a.d++; h.pts+=1; a.pts+=1; }
    });
    let arr=Object.values(map);
    arr.sort((x,y)=>{ if(y.pts!==x.pts) return y.pts-x.pts; let dx=x.gf-x.ga, dy=y.gf-y.ga; if(dy!==dx) return dy-dx; return y.gf-x.gf; });
    return arr;
  }

  function updateTable(){ setApplied([...draft]); setTab('table'); }
  function resetAll(){ setDraft(FUTURE_INIT); setApplied([]); }

  let table = calcTable();
  let basePos={}; BASE.forEach((t,i)=> basePos[t.name]=i+1);
  let filledCount = draft.filter(m=>m.hs!==""&&m.as!=="").length;
  let byRound={};
  draft.forEach((m,idx)=>{ if(!byRound[m.round]) byRound[m.round]=[]; byRound[m.round].push({...m,idx}); });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>دوري نجوم العراق 2026 / 2027</Text>
      <Text style={styles.sub}>بدون انترنيت - OFFLINE - 20 فريق - 38 جولة</Text>
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab,tab==='table'&&styles.active]} onPress={()=>setTab('table')}><Text style={styles.tabText}>1- ترتيب الدوري</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tab,tab==='future'&&styles.active]} onPress={()=>setTab('future')}><Text style={styles.tabText}>2- المباريات القادمة</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tab,tab==='past'&&styles.active]} onPress={()=>setTab('past')}><Text style={styles.tabText}>3- المباريات السابقة</Text></TouchableOpacity>
      </View>

      {tab==='table' && <View>
        <Text style={styles.h2}>{applied.some(m=>m.hs!=="") ? "ترتيب الدوري - محدث حسب نتائجك" : "ترتيب الدوري - بعد الجولة 13 - حقيقي"}</Text>
        <View style={styles.card}>
          <View style={styles.rowHead}><Text style={[styles.cell,styles.head]}>#</Text><Text style={[styles.cell,styles.head,{flex:2}]}>الفريق</Text><Text style={[styles.cell,styles.head]}>لعب</Text><Text style={[styles.cell,styles.head]}>ف</Text><Text style={[styles.cell,styles.head]}>ت</Text><Text style={[styles.cell,styles.head]}>خ</Text><Text style={[styles.cell,styles.head]}>له</Text><Text style={[styles.cell,styles.head]}>عليه</Text><Text style={[styles.cell,styles.head]}>نقاط</Text><Text style={[styles.cell,styles.head]}>حركة</Text></View>
          {table.map((t,i)=>{
            let move = basePos[t.name]-(i+1);
            let arrow = move>0 ? "▲"+move : move<0 ? "▼"+Math.abs(move) : "-";
            return (
              <View key={t.name} style={[styles.row, t.name==="القوة الجوية"?{backgroundColor:'#1e3a8a'}: i<4?{backgroundColor:'#052e16'}:null]}>
                <Text style={styles.cell}>{i+1}</Text>
                <Text style={[styles.cell,{flex:2,fontWeight:'bold',textAlign:'right'}]}>{t.name}</Text>
                <Text style={styles.cell}>{t.p}</Text><Text style={styles.cell}>{t.w}</Text><Text style={styles.cell}>{t.d}</Text><Text style={styles.cell}>{t.l}</Text>
                <Text style={styles.cell}>{t.gf}</Text><Text style={styles.cell}>{t.ga}</Text>
                <Text style={[styles.cell,{fontWeight:'bold',color:'#22c55e'}]}>{t.pts}</Text>
                <Text style={[styles.cell,{color:move>0?'#22c55e':move<0?'#ef4444':'#fff'}]}>{arrow}</Text>
              </View>
            )
          })}
        </View>
        <TouchableOpacity style={styles.reset} onPress={resetAll}><Text style={{color:'#fff',textAlign:'center',fontWeight:'bold'}}>ارجاع للترتيب الحقيقي</Text></TouchableOpacity>
      </View>}

      {tab==='future' && <View>
        <TouchableOpacity style={styles.updateTop} onPress={updateTable}>
          <Text style={{color:'#000',textAlign:'center',fontWeight:'900',fontSize:17}}>🔄 تحديث الترتيب</Text>
          <Text style={{color:'#000',textAlign:'center',fontSize:12}}>{filledCount>0 ? filledCount+" مباراة مملية - دوس للتحديث" : "خلي نتيجة أي مباراة وبعدين دوس هنا"}</Text>
        </TouchableOpacity>
        <Text style={styles.h2}>المباريات القادمة - الجولات 14 لـ 38 - كلها قابلة للتعديل</Text>
        {Object.keys(byRound).sort((a,b)=>a-b).map(r=>(
          <View key={r}>
            <Text style={styles.roundTitle}>الجولة {r} - {byRound[r].length} مباريات</Text>
            {byRound[r].map(m=>(
              <View key={m.idx} style={styles.match}>
                <View style={styles.matchRow}>
                  <Text style={styles.team}>{m.home}</Text>
                  <TextInput style={styles.input} value={m.hs} onChangeText={(v)=>{let c=[...draft]; c[m.idx].hs=v; setDraft(c);}} keyboardType="numeric" placeholder="-" />
                  <Text style={{color:'#fff'}}>-</Text>
                  <TextInput style={styles.input} value={m.as} onChangeText={(v)=>{let c=[...draft]; c[m.idx].as=v; setDraft(c);}} keyboardType="numeric" placeholder="-" />
                  <Text style={styles.team}>{m.away}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
        <TouchableOpacity style={styles.updateTop} onPress={updateTable}><Text style={{color:'#000',textAlign:'center',fontWeight:'900',fontSize:17}}>🔄 تحديث الترتيب</Text></TouchableOpacity>
      </View>}

      {tab==='past' && <View>
        <Text style={styles.h2}>المباريات السابقة - الجولات 1 لـ 13 - نتائج حقيقية</Text>
        <Text style={styles.note}>مقفولة - ما تكدر تغيرها</Text>
        {PAST.map((m,idx)=>(
          <View key={idx} style={styles.match}>
            <Text style={styles.matchTitle}>الجولة {m.round} - انتهت</Text>
            <View style={styles.matchRow}>
              <Text style={styles.team}>{m.home}</Text>
              <Text style={styles.score}>{m.hs} - {m.as}</Text>
              <Text style={styles.team}>{m.away}</Text>
            </View>
          </View>
        ))}
      </View>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#0f172a',padding:12},
  title:{color:'#fff',fontSize:20,fontWeight:'900',textAlign:'center',marginTop:10},
  sub:{color:'#94a3b8',textAlign:'center',marginBottom:10},
  tabs:{flexDirection:'row',gap:6,marginBottom:12},
  tab:{flex:1,backgroundColor:'#1e293b',padding:10,borderRadius:12,alignItems:'center'},
  active:{backgroundColor:'#22c55e'},
  tabText:{color:'#fff',fontWeight:'bold',fontSize:11,textAlign:'center'},
  h2:{color:'#22c55e',fontWeight:'900',fontSize:16,marginBottom:6,textAlign:'right'},
  note:{color:'#94a3b8',fontSize:12,textAlign:'center',marginVertical:4},
  card:{backgroundColor:'#1e293b',borderRadius:12,padding:6},
  rowHead:{flexDirection:'row',paddingVertical:6,borderBottomWidth:1,borderBottomColor:'#334155'},
  row:{flexDirection:'row',paddingVertical:7,borderBottomWidth:1,borderBottomColor:'#334155'},
  cell:{color:'#fff',flex:1,textAlign:'center',fontSize:11},
  head:{color:'#94a3b8',fontWeight:'bold'},
  roundTitle:{color:'#22c55e',fontWeight:'900',fontSize:15,marginTop:14,marginBottom:6,textAlign:'right'},
  match:{backgroundColor:'#1e293b',borderRadius:12,padding:10,marginBottom:8},
  matchTitle:{color:'#22c55e',fontWeight:'bold',textAlign:'center'},
  matchRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:4},
  team:{color:'#fff',fontWeight:'bold',flex:1,textAlign:'center',fontSize:13},
  input:{width:44,backgroundColor:'#fff',borderRadius:8,padding:8,textAlign:'center',fontWeight:'bold',fontSize:16},
  score:{color:'#fff',fontWeight:'900',fontSize:16,backgroundColor:'#334155',paddingHorizontal:12,paddingVertical:4,borderRadius:8},
  updateTop:{backgroundColor:'#22c55e',padding:16,borderRadius:12,marginBottom:12},
  reset:{backgroundColor:'#ef4444',padding:12,borderRadius:12,marginTop:10}
});