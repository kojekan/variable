// "use client";

// import { useState, useEffect } from "react";
// import { getBeans } from "../utils/dbService.js";

// export default function BeanList() {
//   const [beans, setBeans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     async function loadBeans() {
//       try {
//         const { data, error } = await getBeans();
//         console.log("Supabase data:", data);
//         console.log("Supabase error:", error);

//         if (error) {
//           setError(error.message);
//           setStatus("❌ Failed to load beans");
//           setBeans([]);
//         } else {
//           setBeans(data ?? []);
//           setStatus(
//             data && data.length > 0
//               ? "✅ There is data in Supabase"
//               : "⚠️ No data in Supabase (empty)",
//           );
//         }
//       } catch (err) {
//         setError(err.message);
//         setStatus("❌ Unexpected error while loading beans");
//         setBeans([]);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadBeans();
//   }, []);

//   if (loading) return <p>Loading beans...</p>;

//   return (
//     <div>
//       <p>{status}</p>

//       {Array.isArray(beans) && beans.length > 0 ? (
//         beans.map((bean) => (
//           <pre key={bean.id}>{JSON.stringify(bean, null, 2)}</pre>
//         ))
//       ) : (
//         <p>No beans found.</p>
//       )}
//     </div>
//   );
// }
