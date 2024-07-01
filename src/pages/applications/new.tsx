import { useAccount } from "wagmi";

import { Alert } from "~/components/ui/Alert";
import { ApplicationForm } from "~/features/applications/components/ApplicationForm";
import { Layout } from "~/layouts/DefaultLayout";
import { useAppState } from "~/utils/state";
import { EAppState } from "~/utils/types";

const NewProjectPage = (): JSX.Element => {
  const { address } = useAccount();
  const state = useAppState();

  return (
    <Layout>
      <div className="flex w-full justify-center">
        <div className="flex max-w-2xl flex-col gap-4">
          <h3>New Application</h3>

          <p className="text-gray-400">
            Fill out this form to create an application for your project. It will then be reviewed by our admins. Your
            progress is saved locally so you can return to this page to resume your application.
          </p>

          <p className="flex gap-1 text-blue-400">
            <img alt="alert" height="16" src="/alert.svg" width="16" />

            <i className="text-sm">Applications can be edited and approved until the Registration period ends.</i>
          </p>

          {state !== EAppState.APPLICATION ? (
            <Alert title="Application period has ended" variant="info" />
          ) : (
            <ApplicationForm address={address} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NewProjectPage;
