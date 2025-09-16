export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioUrl: string;
}

export interface Playlist {
  title: string;
  items: Track[];
}

export const playlists: Playlist[] = [
  {
    title: "Top Hits 2025",
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `hit-${i + 1}`,
      title: `Hit Song ${i + 1}`,
      artist: `Artist ${i + 1}`,
      cover: `https://picsum.photos/200?random=${i + 1}`,
      audioUrl: "https://scontent.xx.fbcdn.net/o1/v/t2/f2/m69/AQPm6w1CRPmcMYoE4mjYLXpuVV3ybp-EguMTHomtAQSaMorpkcmhuha5UWb522hT6iORapVtaeRrbhwifiYwXSg-.mp4?strext=1&_nc_cat=111&_nc_oc=AdkpYqMUsPdyeu8aywr3-sOsapt5c1eDaWfcjLHHIEhzSzKCyZ3bfnGSReAbAM8q8TM&_nc_sid=8bf8fe&_nc_ht=scontent.fdel42-1.fna.fbcdn.net&_nc_ohc=B83wectYpAsQ7kNvwEKc0f8&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5BVURJT19PTkxZLi5DMy4wLnByb2dyZXNzaXZlX2F1ZGlvX2FhY3BfNDhfZnJhZ18yX2F1ZGlvIiwieHB2X2Fzc2V0X2lkIjoxMjkxMDg3ODE1MjM3NjE4LCJ2aV91c2VjYXNlX2lkIjoxMDU2OCwiZHVyYXRpb25fcyI6MjI1LCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&_nc_zt=28&oh=00_Afb3TdAF7PfeMiapw_zmcqUg3XT8mfTyZdUXTpEI7fCXVQ&oe=68CBB20B", // Replace with real file later
    })),
  },
  {
    title: "Chill Vibes",
    items: Array.from({ length: 8 }, (_, i) => ({
      id: `chill-${i + 1}`,
      title: `Chill Track ${i + 1}`,
      artist: `Artist ${i + 1}`,
      cover: `https://picsum.photos/200?random=${i + 20}`,
      audioUrl: "https://scontent.xx.fbcdn.net/o1/v/t2/f2/m69/AQPm6w1CRPmcMYoE4mjYLXpuVV3ybp-EguMTHomtAQSaMorpkcmhuha5UWb522hT6iORapVtaeRrbhwifiYwXSg-.mp4?strext=1&_nc_cat=111&_nc_oc=AdkpYqMUsPdyeu8aywr3-sOsapt5c1eDaWfcjLHHIEhzSzKCyZ3bfnGSReAbAM8q8TM&_nc_sid=8bf8fe&_nc_ht=scontent.fdel42-1.fna.fbcdn.net&_nc_ohc=B83wectYpAsQ7kNvwEKc0f8&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5BVURJT19PTkxZLi5DMy4wLnByb2dyZXNzaXZlX2F1ZGlvX2FhY3BfNDhfZnJhZ18yX2F1ZGlvIiwieHB2X2Fzc2V0X2lkIjoxMjkxMDg3ODE1MjM3NjE4LCJ2aV91c2VjYXNlX2lkIjoxMDU2OCwiZHVyYXRpb25fcyI6MjI1LCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&_nc_zt=28&oh=00_Afb3TdAF7PfeMiapw_zmcqUg3XT8mfTyZdUXTpEI7fCXVQ&oe=68CBB20B",
    })),
  },
  {
    title: "Workout Mix",
    items: Array.from({ length: 12 }, (_, i) => ({
      id: `workout-${i + 1}`,
      title: `Workout Beat ${i + 1}`,
      artist: `Artist ${i + 1}`,
      cover: `https://picsum.photos/200?random=${i + 40}`,
      audioUrl: "https://scontent.xx.fbcdn.net/o1/v/t2/f2/m69/AQPm6w1CRPmcMYoE4mjYLXpuVV3ybp-EguMTHomtAQSaMorpkcmhuha5UWb522hT6iORapVtaeRrbhwifiYwXSg-.mp4?strext=1&_nc_cat=111&_nc_oc=AdkpYqMUsPdyeu8aywr3-sOsapt5c1eDaWfcjLHHIEhzSzKCyZ3bfnGSReAbAM8q8TM&_nc_sid=8bf8fe&_nc_ht=scontent.fdel42-1.fna.fbcdn.net&_nc_ohc=B83wectYpAsQ7kNvwEKc0f8&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5BVURJT19PTkxZLi5DMy4wLnByb2dyZXNzaXZlX2F1ZGlvX2FhY3BfNDhfZnJhZ18yX2F1ZGlvIiwieHB2X2Fzc2V0X2lkIjoxMjkxMDg3ODE1MjM3NjE4LCJ2aV91c2VjYXNlX2lkIjoxMDU2OCwiZHVyYXRpb25fcyI6MjI1LCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&_nc_zt=28&oh=00_Afb3TdAF7PfeMiapw_zmcqUg3XT8mfTyZdUXTpEI7fCXVQ&oe=68CBB20B",
    })),
  },
  {
    title: "Lo-Fi Study",
    items: Array.from({ length: 6 }, (_, i) => ({
      id: `lofi-${i + 1}`,
      title: `Lo-Fi ${i + 1}`,
      artist: `Artist ${i + 1}`,
      cover: `https://picsum.photos/200?random=${i + 60}`,
      audioUrl: "https://scontent.xx.fbcdn.net/o1/v/t2/f2/m69/AQPm6w1CRPmcMYoE4mjYLXpuVV3ybp-EguMTHomtAQSaMorpkcmhuha5UWb522hT6iORapVtaeRrbhwifiYwXSg-.mp4?strext=1&_nc_cat=111&_nc_oc=AdkpYqMUsPdyeu8aywr3-sOsapt5c1eDaWfcjLHHIEhzSzKCyZ3bfnGSReAbAM8q8TM&_nc_sid=8bf8fe&_nc_ht=scontent.fdel42-1.fna.fbcdn.net&_nc_ohc=B83wectYpAsQ7kNvwEKc0f8&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5BVURJT19PTkxZLi5DMy4wLnByb2dyZXNzaXZlX2F1ZGlvX2FhY3BfNDhfZnJhZ18yX2F1ZGlvIiwieHB2X2Fzc2V0X2lkIjoxMjkxMDg3ODE1MjM3NjE4LCJ2aV91c2VjYXNlX2lkIjoxMDU2OCwiZHVyYXRpb25fcyI6MjI1LCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&_nc_zt=28&oh=00_Afb3TdAF7PfeMiapw_zmcqUg3XT8mfTyZdUXTpEI7fCXVQ&oe=68CBB20B",
    })),
  },
];