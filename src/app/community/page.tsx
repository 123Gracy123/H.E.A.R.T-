import { redirect } from "next/navigation";

export default function CommunityPage() {
  redirect("/messaging?tab=community");
}
