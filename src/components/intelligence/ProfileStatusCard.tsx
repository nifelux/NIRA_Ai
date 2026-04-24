import { getProfile, upsertProfile } from "@/lib/persistence/profileDb";
// src/components/intelligence/ProfileStatusCard.tsx

"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/lib/persistence/profileDb";
import { getSessionId } from "@/lib/experience/SessionManager";

export default function ProfileStatusCard() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const id = getSessionId();
    if (!id) return;

    setProfile(await getProfile(id));
  }, []);

  if (!profile) return null;

  return (
    <div className="nira-panel p-4">
      <h3 className="text-sm text-slate-400">Profile Status</h3>

      <p className="mt-2 text-white text-sm">
        Study Profile: {profile.study.classLevel ? "Complete" : "Incomplete"}
      </p>

      <p className="text-white text-sm">
        Career Profile: {profile.career.careerInterest ? "Complete" : "Incomplete"}
      </p>
    </div>
  );
}
