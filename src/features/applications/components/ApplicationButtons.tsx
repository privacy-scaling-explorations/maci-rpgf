import { useMemo, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";

import { Button, IconButton } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { Spinner } from "~/components/ui/Spinner";
import { useIsCorrectNetwork } from "~/hooks/useIsCorrectNetwork";

import type { Application } from "../types";
import type { ImpactMetrix, ContributionLink, FundingSource } from "~/features/projects/types";

export enum EApplicationStep {
  PROFILE,
  ADVANCED,
  REVIEW,
}

interface IApplicationButtonsProps {
  step: EApplicationStep;
  isUploading: boolean;
  isPending: boolean;
  onNextStep: () => void;
  onBackStep: () => void;
}

export const ApplicationButtons = ({
  step,
  isUploading,
  isPending,
  onNextStep,
  onBackStep,
}: IApplicationButtonsProps): JSX.Element => {
  const { isCorrectNetwork } = useIsCorrectNetwork();

  const { address } = useAccount();

  const [showDialog, setShowDialog] = useState<boolean>(false);

  const form = useFormContext<Application>();

  const application = useMemo(() => form.getValues(), [form]);

  const checkLinks = (links: Pick<ContributionLink | ImpactMetrix | FundingSource, "description">[]): boolean =>
    links.reduce((prev, link) => prev && link.description !== undefined && link.description.length > 0, true);

  const stepComplete = useMemo((): boolean => {
    const {
      name,
      bio,
      payoutAddress,
      websiteUrl,
      profileImageUrl,
      bannerImageUrl,
      contributionDescription,
      impactDescription,
      impactCategory,
      contributionLinks,
      impactMetrics,
      fundingSources,
    } = application;

    if (step === EApplicationStep.PROFILE) {
      return (
        bannerImageUrl !== undefined &&
        profileImageUrl !== undefined &&
        bio.length > 0 &&
        name.length > 0 &&
        payoutAddress.length > 0 &&
        websiteUrl.length > 0
      );
    }

    if (step === EApplicationStep.ADVANCED) {
      return (
        impactCategory !== undefined &&
        contributionDescription.length > 0 &&
        impactDescription.length > 0 &&
        checkLinks(contributionLinks) &&
        checkLinks(impactMetrics) &&
        checkLinks(fundingSources)
      );
    }

    return true;
  }, [step, application]);

  const handleOnClickNextStep = useCallback(() => {
    if (stepComplete) {
      onNextStep();
    } else {
      setShowDialog(true);
    }
  }, [onNextStep, setShowDialog, stepComplete]);

  const handleOnOpenChange = useCallback(() => {
    setShowDialog(false);
  }, [setShowDialog]);

  return (
    <div className="flex justify-end gap-2">
      <Dialog
        description="There are still some inputs not fulfilled, please complete all the required information."
        isOpen={showDialog}
        size="sm"
        title="Please complete all the required information"
        onOpenChange={handleOnOpenChange}
      />

      {step !== EApplicationStep.PROFILE && (
        <Button className="text-gray-300 underline" size="auto" variant="ghost" onClick={onBackStep}>
          Back
        </Button>
      )}

      {step !== EApplicationStep.REVIEW && (
        <Button size="auto" variant="primary" onClick={handleOnClickNextStep}>
          Next
        </Button>
      )}

      {step === EApplicationStep.REVIEW && (
        <IconButton
          disabled={isPending || !address || !isCorrectNetwork}
          icon={isPending ? Spinner : null}
          isLoading={isPending}
          size="auto"
          type="submit"
          variant="primary"
        >
          {isUploading ? "Uploading metadata" : "Submit"}
        </IconButton>
      )}
    </div>
  );
};