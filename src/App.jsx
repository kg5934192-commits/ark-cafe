
import { useState, useEffect, useLayoutEffect, useRef, useMemo } from "react";
 
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop";
 
const menuData = [
  {
    category: "Coffee (قهوة ساخنة)", id: "coffee", icon: "fa-mug-saucer",
    items: [
      { name: "Turkish Coffee", price: "30 / 40 LE", desc: "قهوة تركي مظبوطة ومصنوعة بعناية باختيارك سينجل أو دبل", img: "https://images.unsplash.com/photo-1665385493192-2203c53386b5?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Espresso", price: "30 / 40 LE", desc: "إسبريسو غني بنكهة القهوة المركزة الأوريجينال", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop" },
      { name: "Macchiato", price: "40 / 45 LE", desc: "إسبريسو مضاف إليه لمسة من رغوة الحليب الناعمة", img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=600&auto=format&fit=crop" },
      { name: "Cappuccino", price: "60 LE", desc: "كابوتشينو كلاسيكي برغوة غنية وطعم متوازن", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600&auto=format&fit=crop" },
      { name: "Caffè Latte", price: "50 LE", desc: "قهوة إسبريسو مع حليب مبخر وطبقة خفيفة من الفوم", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop" },
      { name: "Caffè Mocha", price: "70 LE", desc: "مزيج الإسبريسو الرائع مع الشوكولاتة الغنية والحليب", img: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=600&auto=format&fit=crop" },
      { name: "Flat White", price: "65 LE", desc: "إسبريسو مزود بـ Microfoam كريمي ونقي", img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=600&auto=format&fit=crop" },
      { name: "Affogato", price: "50 LE", desc: "بولات آيس كريم فانيليا مغطاة بجرعة إسبريسو ساخن", img: "https://images.unsplash.com/photo-1638543284847-3a6bed3e1689?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Espresso Con Panna", price: "50 LE", desc: "إسبريسو غني يعلوه الكريمة المخفوقة الفاخرة", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop" },
      { name: "Cortado", price: "50 LE", desc: "نسبة متساوية تماماً بين الإسبريسو والحليب الدافئ", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop" },
      { name: "Americano", price: "35 LE", desc: "إسبريسو خفيف مخفف بالماء الساخن بنكهة ممتازة", img: "https://www.handycookbook.com/wp-content/uploads/2023/04/Americano-Recipe--2048x1365.jpeg" },
      { name: "Nescafe Milk", price: "35 LE", desc: "نسكافيه بحليب رغوي لمريدي الطعم الكلاسيكي", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop" },
      { name: "French Coffee", price: "40 LE", desc: "قهوة فرنسية محوجة بالحليب ولذيذة", img: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=600&auto=format&fit=crop" },
      { name: "Hazelnut Coffee", price: "40 LE", desc: "قهوة ممزوجة بنكهة البندق الزكية", img: "https://images.unsplash.com/photo-1497636577773-f1231844b336?q=80&w=600&auto=format&fit=crop" },
      { name: "Nutella Coffee", price: "55 LE", desc: "قهوة ساحرة مضاف إليها شوكولاتة النوتلا الأصيلة", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600&auto=format&fit=crop" },
      { name: "Caramel Macchiato", price: "70 LE", desc: "إسبريسو مع الحليب وصوص الكراميل اللذيذ", img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    category: "Ice Coffee (قهوة مثلجة)", id: "ice-coffee", icon: "fa-glass-water-droplet",
    items: [
      { name: "Frappuccino", price: "60 LE", desc: "فرابوتشينو مثلج ومخفوق بعناية لإنعاشك في أي وقت", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop" },
      { name: "Frappuccino Choco", price: "70 LE", desc: "فرابوتشينو غني بصوص وتوبينج الشوكولاتة", img: "https://plus.unsplash.com/premium_photo-1695750679584-b8e21965ef0f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Frappuccino Caramel", price: "70 LE", desc: "فرابوتشينو مع الكراميل الغني والكريمة", img: "https://images.unsplash.com/photo-1662047102608-a6f2e492411f?q=80&w=600&auto=format&fit=crop" },
      { name: "Spanish Latte", price: "65 LE", desc: "سبانيش لاتيه مثلج ومميز بالحليب المكثف المحلى", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop" },
      { name: "Iced Latte", price: "50 LE", desc: "آيس لاتيه كلاسيكي منعش مع قطع الثلج", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop" },
      { name: "Iced Caramel Macchiato", price: "70 LE", desc: "مزيج الإسبريسو والثلج مع رشة كراميل رائعة", img: "https://images.unsplash.com/photo-1680593180864-55b5b9c21e93?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    category: "Cocktails (كوكتيلات جديدة)", id: "cocktails", icon: "fa-martini-glass",
    items: [
      { name: "Piña Colada", price: "75 LE", desc: "مزيج الاستوائي الرائع من الأناناس وجوز الهند", isNew: true, img: "https://images.unsplash.com/photo-1617728273800-1e615ab03037?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Peachy Mango", price: "60 LE", desc: "خلطة الفراولة المانجو والخوخ الطبيعي", isNew: true, img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=600&auto=format&fit=crop" },
      { name: "Passion Mango", price: "60 LE", desc: "مزيج الباشون فروت مع المانجو المنعش", isNew: true, img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop" },
      { name: "Banana Straw", price: "70 LE", desc: "كوكتيل الموز الطبيعي المخفوق مع الفراولة", isNew: true, img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600&auto=format&fit=crop" },
      { name: "Banana Milk", price: "60 LE", desc: "موز بالحليب الطبيعي وطعم غني للغاية", isNew: true, img: "https://images.unsplash.com/photo-1685967836529-b0e8d6938227?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Yogurt Fruit", price: "75 LE", desc: "زبادي مع فواكه الموسم الطازجة الصحية", isNew: true, img: "https://www.alphafoodie.com/wp-content/uploads/2022/08/Yogurt-Parfait-Main1.jpeg" },
      { name: "Yogurt Honey", price: "55 LE", desc: "زبادي طبيعي مع عسل النحل النقي", isNew: true, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    category: "Milkshake (ميلك شيك)", id: "milkshake", icon: "fa-blender",
    items: [
      { name: "Bounty Milkshake", price: "90 LE", desc: "ميلك شيك باونتي بجوز الهند والشوكولاتة", isNew: true, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop" },
      { name: "Vanilla Coconut", price: "75 LE", desc: "مزيج الفانيليا مع نكهة جوز الهند الناعمة", isNew: true, img: "https://thedrinksproject.com/wp-content/uploads/2025/09/tropical_vanilla_coconut_shake_hr3bu.jpg" },
      { name: "Oreo Milkshake", price: "75 LE", desc: "ميلك شيك كوكيز الأوريو الغني بقطع البسكويت", img: "https://tse3.mm.bing.net/th/id/OIP.zWct89rJL8Z8RZq_DmgpeAHaJ4?r=0&pid=Api&h=220&P=0p" },
      { name: "Snickers Milkshake", price: "90 LE", desc: "شوكولاتة سنيكرز مع الفول السوداني والكراميل", img: "https://media.istockphoto.com/id/1425895300/photo/snickers-milkshake-served-in-glass-side-view-on-wooden-table-morning-meal.jpg?s=2048x2048&w=is&k=20&c=ZXlgl28sF84Hk14dfJXIyRJa1gTKz-eNU5UXnKWH9xo=" },
      { name: "Kitkat Milkshake", price: "90 LE", desc: "ميلك شيك الكتكات المقرمش والشهي", img: "https://images.unsplash.com/photo-1714799263245-4fc7cc21911e?q=80&w=1099&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Kinder Milkshake", price: "90 LE", desc: "ميلك شيك شوكولاتة كيندر بالحليب الفاخر", img: "https://mymorningmocha.com/wp-content/uploads/2023/07/kinder-bueno-milkshake-recipe-800x800.jpg" },
      { name: "Vanilla Milkshake", price: "60 LE", desc: "ميلك شيك فانيليا كلاسيكي ولذيذ", img: "https://www.gestationaldiabetes.co.uk/wp-content/uploads/2023/06/thick-vanilla-shake2.jpg" },
      { name: "Chocolate Milkshake", price: "60 LE", desc: "ميلك شيك شوكولاتة كثيف وممتع", img: "https://iambaker.net/wp-content/uploads/2024/06/Chocolate-Shake-2.jpg" },
      { name: "Strawberry Milkshake", price: "60 LE", desc: "ميلك شيك الفراولة الطبيعية اللذيذة", img: "https://www.sharmispassions.com/wp-content/uploads/2012/02/StrawberryMilkshake4.jpg" },
      { name: "Mango Milkshake", price: "60 LE", desc: "ميلك شيك المانجو الاستوائي الطازج", img: "https://masalahouse.com.sa/wp-content/uploads/2022/09/mango-shake-image.jpeg" },
    ],
  },
  {
    category: "Fresh Juice & Smoothies (عصائر وسموذي)", id: "juices", icon: "fa-lemon",
    items: [
      { name: "Lemon Mint Juice", price: "45 LE", desc: "ليمون نعناع منعش ومثلج ممتاز للصيف", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop" },
      { name: "Mango Fresh Juice", price: "50 LE", desc: "عصير مانجو طبيعي 100% بدون إضافات", img: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=600&auto=format&fit=crop" },
      { name: "Strawberry Juice", price: "50 LE", desc: "عصير فراولة طبيعي طازج بقطع الفاكهة", img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600&auto=format&fit=crop" },
      { name: "Peach Smoothie", price: "50 LE", desc: "سموذي الخوخ اللذيذ بقوام ثقيل ومثلج", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=600&auto=format&fit=crop" },
      { name: "Pineapple Smoothie", price: "50 LE", desc: "سموذي أناناس استوائي بمذاق رائع", img: "https://images.unsplash.com/photo-1604298331663-de303fbc7059?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    category: "Mojito (موهيتو)", id: "mojito", icon: "fa-martini-glass-citrus",
    items: [
      { name: "Mint Mojito", price: "50 LE", desc: "موهيتو بالنعناع الطازج مع الصودا وشرائح الليمون", img: "https://plus.unsplash.com/premium_photo-1722194069219-16ec49c08625?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Strawberry Mojito", price: "50 LE", desc: "موهيتو الفراولة المنعش والصودا المثلجة", img: "https://images.unsplash.com/photo-1668533889350-21a05111310b?q=80&w=835&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Blueberry Mojito", price: "50 LE", desc: "موهيتو التوت الأزرق الرائع والصودا الفوارة", img: "https://images.unsplash.com/photo-1676566352352-40a5e9ae5e9b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    category: "Desserts (حلويات فاخرة)", id: "desserts", icon: "fa-cake-candles",
    items: [
      { name: "Tiramisu", price: "75 LE", desc: "تيراميسو إيطالي أصلي بنكهة القهوة الفاخرة", isNew: true, img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Tagen Waffle", price: "75 LE", desc: "طاجن وافل ساخن غارق في الشوكولاتة والصوصات", isNew: true, img: "https://images.unsplash.com/photo-1685166836342-bfab63e8a095?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Om Ali", price: "60 LE", desc: "أم علي ساخنة بالسمن البلدي والمكسرات والقشطة", isNew: true, img: "https://tse2.mm.bing.net/th/id/OIP.9uWuAitfAQgynybVb225WgHaE7?r=0&pid=Api&h=220&P=0" },
      { name: "Waffle Wiche", price: "105 LE", desc: "ساندوتش وافل محشو بالآيس كريم والصوص المميز", img: "https://media.istockphoto.com/id/1144800709/photo/waffle-with-fruits.jpg?s=2048x2048&w=is&k=20&c=f3e9HnFBNhxP6BBi1c7zOSj2j3mbVvZzbxEp7kDs5og=" },
      { name: "Cinnabon", price: "50 LE", desc: "سينابون دافئ بصوص القرفة والمكسرات والكريمة", img: "https://plus.unsplash.com/premium_photo-1722002219049-1c41e1a034c8?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Honeycake", price: "50 LE", desc: "كيكة العسل الروسية بطبقاتها الناعمة الهشة", img: "https://media.istockphoto.com/id/1453137499/photo/slice-of-delicious-layered-honey-cake-served-on-wooden-table-closeup.jpg?s=2048x2048&w=is&k=20&c=Gszrvjhxo5uAwnbnAYxuF632kM6tpvzWx1_s32-L-80=" },
      { name: "Cheesecake", price: "50 LE", desc: "تشيز كيك كريمي مع صوص التوت أو الفراولة", img: "https://images.unsplash.com/photo-1702920375096-5ae53044d11c?q=80&w=696&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Molten Cake", price: "80 LE", desc: "مولتن كيك محشو بالشوكولاتة السائلة مع آيس كريم", img: "https://images.unsplash.com/photo-1606313564573-104197cf8f91?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Chocolate Brownies", price: "80 LE", desc: "قطع براونيز الشوكولاتة الغنية الداكنة", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop" },
      { name: "Tagen Nutella", price: "75 LE", desc: "طاجن نوتلا ساخن ولذيذ لعشاق النوتلا", img: "https://tse3.mm.bing.net/th/id/OIP.Gt6pB5fqe5SEAFt8Nn9-wgHaE8?r=0&pid=Api&h=220&P=0" },
      { name: "Red Velvet", price: "50 LE", desc: "كيكة ناعمة ولذيذة بطعم الفراولة الطازجة", img: "https://bakerbynature.com/wp-content/uploads/2016/11/untitled-17-of-74-3-1-706x1024.jpg" },
      { name: "Waffle", price: "45 / 75 LE", desc: "وافل لذيذ مع صوص مميز", img: "https://media.istockphoto.com/id/1144800709/photo/waffle-with-fruits.jpg?s=2048x2048&w=is&k=20&c=f3e9HnFBNhxP6BBi1c7zOSj2j3mbVvZzbxEp7kDs5og=" },
    ],
  },
  {
    category: "Ice Cream (آيس كريم)", id: "ice-cream", icon: "fa-ice-cream",
    items: [
      { name: "Vanilla", price: "20 / 40 LE", desc: "آيس كريم فانيليا طبيعي سينجل أو دبل بولة", img: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=600&auto=format&fit=crop" },
      { name: "Chocolate", price: "20 / 40 LE", desc: "آيس كريم شوكولاتة غني ومميز", img: "https://images.unsplash.com/photo-1620197544618-af5f5366abb3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Oreo", price: "20 / 40 LE", desc: "آيس كريم ممزوج بقطع الأوريو المقرمشة", img: "https://plus.unsplash.com/premium_photo-1776973055738-fd36dece8ee0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Strawberry", price: "20 / 40 LE", desc: "آيس كريم فراولة طبيعي ومنعش", img: "https://images.unsplash.com/photo-1532678465554-94846274c297?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Mango", price: "20 / 40 LE", desc: "آيس كريم مانجو استوائي لذيذ", img: "https://plus.unsplash.com/premium_photo-1724255862353-c6bc210e3d63?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Blueberry", price: "20 / 40 LE", desc: "آيس كريم التوت الأزرق الطبيعي الغني بالنكهة", img: "https://images.unsplash.com/photo-1600796151015-fade25ec92b1?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
];
 
const globalCss = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Montserrat:wght@500;700;800&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
.ark-root { font-family: 'Cairo', 'Montserrat', sans-serif; background-color: #181814; color: #e6edd8; }
.ark-root .gold-gradient { background: linear-gradient(135deg, #d4af37 0%, #f3e5ab 50%, #aa7c11 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.ark-root .gold-bg { background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%); }
.ark-root .hide-scrollbar::-webkit-scrollbar { display: none; }
.ark-root .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.ark-root .card-glass { background: rgba(22, 27, 34, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(212, 175, 55, 0.15); }
.ark-root .card-glass:hover { border-color: rgba(212, 175, 55, 0.5); transform: translateY(-2px); }
`;
 
function Logo() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex items-center gap-3">
      {failed ? (
        <div className="w-12 h-12 rounded-full gold-bg flex items-center justify-center text-black">
          <i className="fa-solid fa-mug-hot text-xl" />
        </div>
      ) : (
        <img
          src="/images/logo.png"
          alt="The Ark Café"
          className="h-12 w-auto"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
 
function MenuImage({ src, alt, className }) {
  const [url, setUrl] = useState(src);
  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => url !== FALLBACK_IMAGE && setUrl(FALLBACK_IMAGE)}
    />
  );
}
 
function MenuCard({ item, onOpen }) {
  return (
    <div
      onClick={onOpen}
      className="card-glass rounded-xl p-3 flex space-x-3 space-x-reverse cursor-pointer transition-all duration-300 group"
    >
      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-900 border border-gray-800">
        <MenuImage
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        {item.isNew && (
          <span className="absolute top-1 right-1 gold-bg text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded">
            NEW
          </span>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex justify-between items-start mb-1 gap-2">
            <h3 className="font-bold text-sm text-gray-100 group-hover:text-[#d4af37] transition">
              {item.name}
            </h3>
            <span className="text-xs font-bold text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/20 whitespace-nowrap">
              {item.price}
            </span>
          </div>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{item.desc}</p>
        </div>
        <div className="flex items-center text-[11px] text-[#d4af37]/80 font-medium">
          <span>اضغط للتكبير والتفاصيل</span>
          <i className="fa-solid fa-chevron-left text-[9px] mr-1" />
        </div>
      </div>
    </div>
  );
}
 
function ItemModal({ selected, onClose }) {
  if (!selected) return null;
  const { cat, item } = selected;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-[#161b22] rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute top-3 left-3 z-10 w-9 h-9 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black transition"
        >
          <i className="fa-solid fa-xmark text-lg" />
        </button>
        <MenuImage src={item.img} alt={item.name} className ="ml-3 w-full h-64 object-cover"  />
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">{item.name}</h3>
            <span className="text-lg font-bold text-[#d4af37]">{item.price}</span>
          </div>
          <p className="text-xs text-[#d4af37]/80 uppercase font-semibold mb-2">{cat.category}</p>
          <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </div>
  );
}
 
export default function ArkCafeMenu() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState(menuData[0].id);
  const [selected, setSelected] = useState(null);
  const [offsets, setOffsets] = useState({ header: 0, stack: 150 });
 
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const tabsRef = useRef({});
  const pendingScroll = useRef(null);
 
  // Filtered data (same logic as original filterMenu)
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return menuData;
    return menuData
      .map((cat) => {
        const items = cat.items.filter(
          (i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
        );
        return items.length ? { ...cat, items } : null;
      })
      .filter(Boolean);
  }, [query]);
 
  // Keep the nav right under the header, whatever its height is
  useLayoutEffect(() => {
    const sync = () => {
      const h = headerRef.current?.offsetHeight ?? 0;
      const n = navRef.current?.offsetHeight ?? 0;
      setOffsets({ header: h, stack: h + n + 8 });
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
 
  // Highlight the active tab while scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActiveCat(e.target.id));
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    document.querySelectorAll("#ark-menu-container section").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [filtered]);
 
  // Keep the active tab visible in the tab bar
  useEffect(() => {
    tabsRef.current[activeCat]?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeCat]);
 
  // Run a scroll that was waiting for the full menu to render
  useEffect(() => {
    if (pendingScroll.current && !query) {
      document.getElementById(pendingScroll.current)?.scrollIntoView({ behavior: "smooth" });
      pendingScroll.current = null;
    }
  }, [query, filtered]);
 
  // Close modal on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
 
  const scrollToCategory = (id) => {
    setActiveCat(id);
    if (query) {
      // clear the search first so all sections come back, then scroll
      pendingScroll.current = id;
      setQuery("");
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };
 
  return (
    <div dir="rtl" lang="ar" className="ark-root pb-12 min-h-screen">
      <style>{globalCss}</style>
 
      {/* Header: Logo + Search (sticky) */}
      <header
        ref={headerRef}
        className="sticky top-0 z-40 bg-[#0d1117]/95 backdrop-blur-md border-b border-[#d4af37]/20 px-4 py-3"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-2">
          <Logo />
          <div className="w-full relative max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن مشروبك أو الحلوى المفضل..."
              className="w-full bg-[#161b22] border border-[#d4af37]/30 text-sm text-gray-200 rounded-full py-2 px-10 focus:outline-none focus:border-[#d4af37] transition-all"
            />
            <i className="fa-solid fa-magnifying-glass absolute right-3.5 top-3 text-gray-400 text-sm" />
          </div>
        </div>
      </header>
 
      {/* Categories nav (sticky right under the header) */}
      <nav
        ref={navRef}
        className="sticky z-30 bg-[#0d1117] border-b border-gray-800 py-3 shadow-lg"
        style={{ top: offsets.header }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-2 space-x-reverse overflow-x-auto hide-scrollbar py-1">
            {menuData.map((cat) => {
              const on = cat.id === activeCat;
              return (
                <button
                  key={cat.id}
                  ref={(el) => (tabsRef.current[cat.id] = el)}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
                    on
                      ? "gold-bg text-black border-[#d4af37]"
                      : "bg-[#161b22] text-gray-300 border-gray-700 hover:border-[#d4af37]"
                  }`}
                >
                  <i className={`fa-solid ${cat.icon} ml-1.5 text-xs`} />
                  {cat.category}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
 
      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-8">
        <div className="bg-gradient-to-r from-[#1c1917] via-[#292524] to-[#1c1917] border border-[#d4af37]/40 rounded-2xl p-4 flex items-center justify-between shadow-xl">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-full gold-bg flex items-center justify-center text-black font-bold">
              <i className="fa-solid fa-mug-hot text-lg" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">أهلاً بكم فى THE ARK CAFE</h3>
              <p className="text-xs text-gray-400">تصفح أصناف المنيو مع صور واقعية بجودة عالية</p>
            </div>
          </div>
          <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] px-3 py-1 rounded-full font-bold border border-[#d4af37]/40">
            المنيو الرقمي
          </span>
        </div>
 
        <div id="ark-menu-container" className="space-y-10">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <i className="fa-solid fa-mug-hot text-4xl mb-3 text-gray-600" />
              <p className="text-sm">لم نجد أي مشروب أو حلوى بهذا الاسم</p>
            </div>
          ) : (
            filtered.map((cat) => {
              const fullCat = menuData.find((c) => c.id === cat.id);
              return (
                <section
                  key={cat.id}
                  id={cat.id}
                  style={{ scrollMarginTop: offsets.stack }}
                >
                  <div className="flex items-center space-x-3 space-x-reverse mb-4 pb-2 border-b border-[#d4af37]/30">
                    <i className={`fa-solid ${cat.icon} text-lg text-[#d4af37]`} />
                    <h2 className="text-lg font-bold text-white tracking-wide">{cat.category}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cat.items.map((item) => (
                      <MenuCard
                        key={item.name}
                        item={item}
                        onOpen={() => setSelected({ cat: fullCat, item })}
                      />
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </main>
 
      <ItemModal selected={selected} onClose={() => setSelected(null)} />
 
      <footer className="mt-16 border-t border-gray-800 text-center py-6 text-gray-500 text-xs">
        <p className="mb-1">
          جميع الحقوق محفوظة © 2026 - <span className="gold-gradient font-bold">The Ark Café</span>
        </p>
        <p className="text-gray-600">منيو رقمي سريع عبر QR Code</p>
      </footer>
    </div>
  );
}
 
