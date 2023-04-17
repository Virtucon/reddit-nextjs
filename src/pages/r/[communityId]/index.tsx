import { Community } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { FC } from "react";
import safeJsonStringify from "safe-json-stringify";

interface CommunityPageProps {
  communityData: Community;
}

const CommunityPage: FC<CommunityPageProps> = ({ communityData }) => {
  return <div>Welcome to {communityData.id}</div>;
};

// SSR
export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        ),
      },
    };
  } catch (error) {
    console.log("getServerSideProps error: ", error);
  }
}

export default CommunityPage;
