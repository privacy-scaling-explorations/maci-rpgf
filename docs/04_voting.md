# Voting

Once applications have been approved and the voters' addresses have been added, your voters can now signup and then vote for projects.

- Navigate to https://easy-retro-pgf.vercel.app/projects
- Click Signup button and wait for transaction confirmation
- After signup, click the plus icon on the project card or Add to ballot button in the project details page
- Click View ballot to navigate to the ballot page (https://easy-retro-pgf.vercel.app/ballot)
- Adjust the allocation
- Click Submit ballot and send the transaction

You can also export your ballot as a CSV to import into Excel where you can make changes and later export as a CSV. This CSV file can then be imported and replace your ballot.

As a coordinator, you need to tally the poll results and publish them using CDN (see `NEXT_PUBLIC_TALLY_URL` env variable). See [maci docs](https://maci.pse.dev/docs/integrating#poll-finalization) for more information.

:::info
Please be advised that due to the block gas limit for most EVM networks, the number of votes that can be sent in one batch has been limited to 50. The effort to increase the limit is tracked [here](https://github.com/privacy-scaling-explorations/maci-rpgf/issues/31).
:::
