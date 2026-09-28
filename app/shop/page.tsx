'use client';
import { useState } from 'react';
import { BrandShell } from '@/components/brand/BrandShell';
import { ObjectGallery } from '@/components/brand/ObjectGallery';
import s from '@/components/brand/Brand.module.css';
export default function ShopPage(){const [filter,setFilter]=useState('All');return <BrandShell><section className={s.subpage}><span className={s.sectionLabel}>THE CHAEUN EDIT / 01</span><h1 className={s.pageTitle}>Good company.</h1><p className={s.pageLead}>마음에 들어서, 오래 곁에 두고 싶은 것들.<br/>부드러운 빛과 색, 손끝에 닿는 작은 즐거움.</p><p className={s.pageNote}>채운의 오브제 컬렉션을 준비 중입니다. 이미지는 컬렉션의 디자인 콘셉트이며, 현재 판매 상품이 아닙니다.</p><div className={s.filters} aria-label="오브제 분류">{['All','Objects','Lighting','Textiles'].map(f=><button key={f} onClick={()=>setFilter(f)} aria-pressed={filter===f}>{f}</button>)}</div><ObjectGallery filter={filter} linked={false}/></section></BrandShell>}
