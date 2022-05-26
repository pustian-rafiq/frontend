import Title from "../../components/Header/Title";
import { Container, Grid, Typography } from "@mui/material";
import Youtubevideo from "../../components/YoutubeVideos/YoutubeVideos";

const vedeos=[
  {
    id:1,
    title:'১. এটা আসলে কি?',
    link:'https://www.youtube.com/embed/9MAu0yk35H0'
  },
    {
    id:2,
    title:'২. পৃথিবীতে কত ধরনের ব্যবসা আছে ও কি কি?',
    link:'https://www.youtube.com/embed/_33yOxwV2Tw?list=PLwouCLgL_ICLLmhY-Zium0VEFPx6nViJ9'
  },
    {
    id:3,
    title:'৩. ট্রেডিশনাল, এম এল এম ও ইহ্সান পদ্ধতির মধ্যে পার্থক্য',
    link:'https://www.youtube.com/embed/dcq03fK6X7Y?list=PLwouCLgL_ICLLmhY-Zium0VEFPx6nViJ9'
  },

    {
    id:4,
    title:'৪. ইহ্সান পদ্ধতিকে নিয়ন্ত্রণ করছে ও কোম্পানীর নাম সম্পর্কে সতর্কতা',
    link:'https://www.youtube.com/embed/ZGlXjA9jKsQ'
  },

  
    {
    id:5,
    title:'৫. ইহ্সান মার্কেটিং থেকে কিভাবে আয় করবেন?',
    link:'https://www.youtube.com/embed/qIjHkxIi-kk'
  },

    {
    id:6,
    title:'৬. দোকানদারগণ কেন আমাদের লভ্যাংশ দিবেন?',
    link:'https://www.youtube.com/embed/diQ627qzYuE'
  },

    {
    id:7,
    title:'৭. কোন ধরনের দোকানদার আমাদের ব্যবসায় সম্পৃক্ত হতে পারবেন?',
    link:'https://www.youtube.com/embed/7RvK7L_33jM'
  },

 
  {
    id:8,
    title:'৮. ক্ষুদ্র ব্যবসায়ীরা কিভাবে আমাদের কার্যক্রমে অংশগ্রহণ করবেন?',
    link:'https://www.youtube.com/embed/CZaCIeDCk2s'
  },

    {
    id:9,
    title:'৯. ইহ্সান পদ্ধতিতে কিভাবে পণ্য ক্রয় করবেন?',
    link:'https://www.youtube.com/embed/l48pghwmeMs'
  },
    {
    id:10,
    title:'১০. ইনকাম ক্যাটাগরী',
    link:'https://www.youtube.com/embed/rp-BkGTKnuY'
  },
    {
    id:11,
    title:'১১. ইনসেনটিভ ক্যাটাগরী, পদবীর অর্থ ও অর্জনের নিয়ম',
    link:'https://www.youtube.com/embed/pS-3PpWFw0U'
  },

    {
    id:12,
    title:'১২. ওয়েবসাইটে কিভাবে প্রবেশ করবেন?',
    link:'https://www.youtube.com/embed/Cj3u5OTnRgk'
  },
    {
    id:13,
    title:'১৩. কিভাবে আপনার এ্যাকাউন্টে প্রবেশ করবেন?',
    link:'https://www.youtube.com/embed/aQvYk4byXXE'
  },
    {
    id:14,
    title:'১৪. কিভাবে কঞ্জুমার রেজিস্ট্রেশন করবেন?',
    link:'https://www.youtube.com/embed/NDsZbXkSZ-4'
  },
    {
    id:15,
    title:'১৫. ক্ষুদ্র লভ্যাংশের টাকা পেমেন্ট করবেন কিভাবে?',
    link:'https://www.youtube.com/embed/P28ckNNFjls'
  },


  {
    id:16,
    title:'১৬. কিভাবে কমিশনের টাকা উঠানোর জন্য রিকুইজিশন দিবেন?',
    link:'https://www.youtube.com/embed/vmW9FtOHRqI'
  },
    {
    id:17,
    title:'১৭. কিভাবে ও কোথায় থেকে টাকা উঠাবেন?',
    link:'https://www.youtube.com/embed/GjV6ylN63I4'
  },

    {
    id:18,
    title:'১৮. ইনকাম ট্যাক্স',
    link:'https://www.youtube.com/embed/1UQlxLxxeTc'
  },

    {
    id:19,
    title:'১৯. ভ্যাট',
    link:'https://www.youtube.com/embed/L9co5rEPcUs'
  },
  {
    id:20,
    title:'২০. অনলাইনে পণ্য ক্রয় বিক্রয়ের ক্ষেত্রে কিছু সমস্যা, প্রতিকার ও আমাদের সার্ভিস',
    link:'https://www.youtube.com/embed/pcQ-YId5bb0'
  },

  {
    id:21,
    title:'২১. লক্ষ্য রাখুন!',
    link:'https://www.youtube.com/embed/_3UXHQhhuBw'
  },  

  {
    id:22,
    title:'২২. এটা পৃথিবীতে নতুন ও বিনিয়োগ ছাড়া ব্যবসা। যেহেতু বিনিয়োগ নেই ঝুঁকিও নেই।',
    link:'https://www.youtube.com/embed/fFKgnlQ1UaU'
  },

    {
    id:23,
    title:'২৩. ১ ডলার সমপরিমাণ টাকা কি সব সময় কোম্পানিতে জমা থাকবে?',
    link:'https://www.youtube.com/embed/dUw2t2owbic'
  }, 

  {
    id:24,
    title:'২৪. দোকানদার যদি আমাদের সার্ভিস না দেয় তাহলে কি করবেন?',
    link:'https://www.youtube.com/embed/n9KBNd0oH2g'
  }, 
  
  {
    id:25,
    title:'২৫. নিজে উদ্যোক্তা হোন ও সবাইকে উদ্যোক্তা হতে সহায়তা করুন।',
    link:'https://www.youtube.com/embed/lS8eBsvsX9U'
  },
    {
    id:26,
    title:'২৬. গ্রামের নিরীহ ও অসহায় কৃষকদের পণ্যের ন্যায্য মূল্য পেতে সহায়তা করুন।',
    link:'https://www.youtube.com/embed/7yovT4keE3g'
  },
      {
    id:27,
    title:'২৭. কিভাবে নিজের দোকানের পণ্য বিক্রয় করে লাভ করার পাশাপাশি অন্য দোকানের পণ্য বিক্রয়েও লাভবান হবেন?',
    link:'https://www.youtube.com/embed/4ff3EB_kpK8'
  },
   {
    id:28,
    title:'২৮. কিভাবে এই সিস্টেমে কাজ করে ইন্টারন্যাশনাল বিজনেসম্যান হবেন?',
    link:'https://www.youtube.com/embed/Zloqp9flznY'
  },
    {
    id:29,
    title:'২৯. সবাই কি কঞ্জুমার হতে পারবে?',
    link:'https://www.youtube.com/embed/LPCjPp1inFw'
  },
      {
    id:30,
    title:'৩০. ইনসেন্টিভ অর্জনে কি বাড়তি ইনকাম করতে পারবেন?',
    link:'https://www.youtube.com/embed/M48IkdJE2SI'
  },

  {
    id:31,
    title:'৩১. দ্রুত কিভাবে ইনসেন্টিভ অর্জন করা যাবে?',
    link:'https://www.youtube.com/embed/p-v3ZqcKbjw'
  },
  {
    id:32,
    title:'৩২. কোম্পানির কি লাভ?',
    link:'https://www.youtube.com/embed/q7ujmVKonLI'
  },
  {
    id:33,
    title:'৩৩. কোম্পানি যদি উঠে যায়?',
    link:'https://www.youtube.com/embed/RwlD2FqW_mQ'
  },

    {
    id:34,
    title:'৩৪. কোন আবিষ্কারক কি তার আবিষ্কারকে ধ্বংস করতে পারে?',
    link:'https://www.youtube.com/embed/e5QvuF3uoD0'
  },
     {
    id:35,
    title:'৩৫. সফলতার জন্য করনীয়-',
    link:'https://www.youtube.com/embed/a1L5tf9TavU'
  },

  {
    id:36,
    title:'৩৬. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-১',
    link:'https://www.youtube.com/embed/VLpFWhfKOko'
  },
  {
    id:37,
    title:'৩৭. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-২',
    link:'https://www.youtube.com/embed/JNrSoUURhB8'
  },
  {
    id:38,
    title:'৩৮. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-৩',
    link:'https://www.youtube.com/embed/8ocORO7DBmQ'
  },
    {
    id:39,
    title:'৩৯. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-৪',
    link:'https://www.youtube.com/embed/sbvzvxSvq6E'
  },
      {
    id:40,
    title:'৪০. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-৫',
    link:'https://www.youtube.com/embed/Mvv-tj_3unE'
  },

  {
    id:41,
    title:'৪১. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-৬',
    link:'https://www.youtube.com/embed/3Gabm6r2C7U'
  },

    {
    id:42,
    title:'৪২. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-৭',
    link:'https://www.youtube.com/embed/aMOeEkKMOcA'
  },
    
  {
    id:43,
    title:'৪৩. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-৮',
    link:'https://www.youtube.com/embed/6y4aDWDjyvY'
  },

    {
    id:44,
    title:'৪৪. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-৯',
    link:'https://www.youtube.com/embed/hI9R0TNQ-h4'
  },
  
  {
    id:45,
    title:'৪৫. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-১০',
    link:'https://www.youtube.com/embed/OyGPz3GVgiA'
  },
  
    {
    id:46,
    title:'৪৬. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-১১',
    link:'https://www.youtube.com/embed/QOgO7Xa3-5o'
  },

   {
    id:47,
    title:'৪৭. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-১২',
    link:'https://www.youtube.com/embed/9OefpzN7uGE'
  },

   {
    id:48,
    title:'৪৮. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-১৩',
    link:'https://www.youtube.com/embed/NoatNHrJDNI'
  },
  {
    id:49,
    title:'৪৯. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-১৪',
    link:'https://www.youtube.com/embed/j2V7ef-ce5Q'
  },
  {
    id:50,
    title:'৫০. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-১৫',
    link:'https://www.youtube.com/embed/E-8rADclK5E'
  },
    
  {
    id:51,
    title:'৫১. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-১৬',
    link:'https://www.youtube.com/embed/Zx6iGR8opT0'
  },
    {
    id:52,
    title:'৫২. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-১৭', 
    link:'https://www.youtube.com/embed/Qo249__SydI'
  },
   {
    id:53,
    title:'৫৩. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-১৮',
    link:'https://www.youtube.com/embed/zUr2pc36WuA'
  },
    
  {
    id:54,
    title:'৫৪. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-১৯',
    link:'https://www.youtube.com/embed/zUr2pc36WuA'
  },

    {
    id:55,
    title:'৫৫. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-২০',
    link:'https://www.youtube.com/embed/SJ__pOEAsBM'
  },

  {
    id:56,
    title:'৫৬. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-২১',
    link:'https://www.youtube.com/embed/LB32acHZhiM'
  },
    {
    id:57,
    title:'৫৭. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-২২',
    link:'https://www.youtube.com/embed/j3x6s1v1n20'
  },

   {
    id:58,
    title:'৫৮. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-২৩',
    link:'https://www.youtube.com/embed/Je1V72E1ePw'
  },
  {
    id:59,
    title:'৫৯. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-২৪',
    link:'https://www.youtube.com/embed/oPY8ngO9iO0'
  },
    {
    id:60,
    title:'৬০. সকলকে আমাদের ফ্রি সফটওয়্যার নিতে ও সার্ভিস দিতে সিস্টেমলি কাজ করুন-২৫',
    link:'https://www.youtube.com/embed/1XOwRn6Gcyk'
  },
  {
    id:61,
    title:'৬১. কেউ যদি দোকানে বাকিতে পণ্য ক্রয় করেন তাহলে কি হবে?',
    link:'https://www.youtube.com/embed/n6y2714YEig'
  },
    {
    id:62,
    title:'৬২. কঞ্জুমার আগে এন্ট্রি দিবো না দোকান আগে ঠিক করবো?',
    link:'https://www.youtube.com/embed/eWQevoiisOQ'
  },

  {
    id:63,
    title:'৬৩. গরিব এলাকা কিভাবে কাজ করবো?',
    link:'https://www.youtube.com/embed/VmT85O2BxIg'
  },

    {
    id:64,
    title:'৬৪. প্রত্যন্ত এলাকায় কিভাবে কাজ করবো?',
    link:'https://www.youtube.com/embed/1x7xrs0cfSU'
  },
      {
    id:65,
    title:'৬৫. ইন্টারনেটের সমস্যা তাহলে কি করনীয়?',
    link:'https://www.youtube.com/embed/SpMPINrhClA'
  },

  {
    id:66,
    title:'৬৬. অনেকেই কঞ্জুমার হতে ইচ্ছুক নয় তাহলে কি করবো?',
    link:'https://www.youtube.com/embed/uZ73FxBz0GA'
  },
   {
    id:67,
    title:'৬৭. কর্মী না হলে কাজ করবো কিভাবে?',
    link:'https://www.youtube.com/embed/s3Dog1uKKB4'
  },
     {
    id:68,
    title:'৬৮. লেখাপড়া নেই তাহলে কি কাজ করতে পারবো?',
    link:'https://www.youtube.com/embed/7XS30Va68zc'
  },

   {
    id:69,
    title:'৬৯. উচ্চ শিক্ষিত তাই এই কাজ আমার দ্বারা সম্ভব নয়?',
    link:'https://www.youtube.com/embed/vVz77zAlhZM'
  },
     {
    id:70,
    title:'৭০. কঞ্জুমার হওয়ার কথা মানুষকে বললে আমি ছোট হয়ে যাবো।',
    link:'https://www.youtube.com/embed/surM_EKiIpQ'
  },

       {
    id:71,
    title:'৭১. মানুষকে কঞ্জুমার হওয়ার কথা বললে যদি কমজুমার না হয় তাহলে আমার সন্মান শেষ হয়ে যাবে।',
    link:'https://www.youtube.com/embed/gIxCmNYQFjk'
  },

  {
    id:72,
    title:'৭২. সামান্য এই টাকার জন্য আবার কি কাজ করবো?',
    link:'https://www.youtube.com/embed/IZ-ojdqPHn4'
  },

    {
    id:73,
    title:'৭৩. মানুষ আমার কথা শোনেনা।',
    link:'https://www.youtube.com/embed/i6RpgpygxUM'
  },
   {
    id:73,
    title:'৭৪. সমাজের উঁচু শ্রেণীর লোকদের মধ্যে আমি একজন, সামান্য এই বিষয় নিয়ে কি বলবো?',
    link:'https://www.youtube.com/embed/76LAgRnSPXk'
  },
     {
    id:74,
    title:'৭৪. সমাজের উঁচু শ্রেণীর লোকদের মধ্যে আমি একজন, সামান্য এই বিষয় নিয়ে কি বলবো?',
    link:'https://www.youtube.com/embed/76LAgRnSPXk'
  },
  {
    id:75,
    title:'৭৫. এখানে কি টার্গেট আছে?',
    link:'https://www.youtube.com/embed/LceZr9mOU5I'
  },
    {
    id:76,
    title:'৭৬. এখানে কাজটা কি?',
    link:'https://www.youtube.com/embed/tfLe-_O_Jl8'
  },
  
  {
    id:77,
    title:'৭৭. অন্যান্য ই কমার্স সাইট থেকে কি ইহসান মার্কেটিং কোম্পানীর সার্ভিস পাওয়া যাবে?',
    link:'https://www.youtube.com/embed/pDuEd0FNbBw'
  },


]

const Videos = () => {
  return (
    <div>
      <Title>Videos</Title>

      <Typography
        variant="h5"
        sx={{ mt: "10px", py: "3px", textAlign: "center" }}
      >
        Learn from videos
      </Typography>

      <Container maxWidth="lg" sx={{ my: "50px" }}>
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          {vedeos.map((video) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <Youtubevideo  video={video} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Videos;
