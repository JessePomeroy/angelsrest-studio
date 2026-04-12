import type { DocumentActionComponent } from "sanity";
import { useDocumentOperation } from "sanity";
import { useRouter } from "sanity/router";

export const DuplicateGalleryAction: DocumentActionComponent = (props) => {
  const { duplicate } = useDocumentOperation(props.id, props.type);
  const router = useRouter();

  return {
    label: "Duplicate for next season",
    onHandle: () => {
      const dupeId = duplicate.execute();
      if (typeof dupeId === "string") {
        // Navigate to the new draft
        router.navigateIntent("edit", { id: dupeId, type: props.type });
      }
      props.onComplete();
    },
  };
};
