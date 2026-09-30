/** A dashboard names a direction, never republishes the user's private anecdote. */
export function dashboardReflection(topic:string){
 const reflections:Record<string,{title:string;body:string}>={
  love:{title:'마음의 속도와 관계의 타이밍을 맞추는 중',body:'너다운 기준은 지키면서, 마음을 편히 열 여유를 함께 채워보자.'},
  money:{title:'좋아하는 일이 나만의 결실로 이어지도록',body:'가능성을 서두르기보다, 작은 시작이 차곡차곡 쌓일 자리를 마련해보자.'},
  career:{title:'잘하는 것과 나아갈 방향을 연결하는 중',body:'도전하는 힘은 살리고, 돌아와 쉬고 다시 준비할 리듬을 곁에 둘게.'},
  moving:{title:'새로운 일상에 맞는 자리를 찾는 중',body:'앞으로의 생활에 필요한 편안함과 움직임을 공간에 담아보자.'},
  firsthome:{title:'내 속도로 살아갈 공간을 그리는 중',body:'처음의 설렘과 일상의 든든함이 함께 머물 자리를 만들어보자.'},
 };
 return reflections[topic]??{title:'나에게 맞는 일상의 균형을 찾는 중',body:'너의 좋은 점은 그대로 두고, 편히 머물 여유를 공간으로 더해보자.'};
}
