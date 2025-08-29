---
tags: ["delivery-and-flow", "metrics-and-reporting", "definitions-of-done-ready"]
title: Common workflow states to improve reporting
#id:
#sidebar_label:
#keywords:
#  - keyword1
#  - keyword2
#  - keyword3
description: This document outlines the mandatory workflow states for Global Technology teams at Schroders to ensure consistency in metrics, reporting, and auditing. By standardizing workflow states, it aims to identify bottlenecks, streamline processes, and facilitate leadership support, thereby enhancing collaborative efforts towards project goals while complying with the Software Development Life Cycle (SDLC) policy.
#tags:
#  - tag1
#  - tag2
#  - tag3
---

![A close-up of a piece of paper Description automatically generated](Common%20workflow%20states%20to%20improve%20reporting_media/media/image1.jpeg)

# Common Workflow States to Improve Reporting (CDF Pattern)

 (opens new browser tab)

**

The workflow used by all the teams in Global Technology (GT) must contain certain common states to bring the consistency required for metrics, reporting and auditing.

The commonality this provides helps us look across GT as a whole to understand where there are bottlenecks and blockers. It also helps to identify potential issues as early as possible when multiple teams are collaborating towards a common goal.

As an example, if we observe a build-up of work in the ready state across multiple teams it is worth looking at whether we are refining too much work upfront for the capacity and pace of the teams. This would be identified as waste in [Lean](https://schroders365eur.sharepoint.com/sites/myschroders/content/Pages/CorporatePages/cA5DcI8h54ye17yXUNla6w/388a414f-4b39-4a75-85ba-621264a4b949.aspx) (opens new browser tab), and we would look to do something to smooth the throughput.

The use of a common workflow allows teams to take advantage of automated metrics and reporting created by central teams and ensures leadership assistance can be targeted to the issues beyond their scope of control. These metrics can then be used to guide the continuous improvement of the team\'s processes and practices.

## How does this look at Schroders currently?

Within our current chosen workflow tool, i.e. Azure DevOps (ADO), there are certain underlying workflow states that are common and mandated across all teams. However, commonality in underlying states does not mean the workflow on the team's board (the states a ticket moves through on the team\'s workboard) must be an exact match.

A team can configure their task board to use a different column name to the name of a state. Furthermore, to represent more granular workflow steps, a board can be configured with multiple columns for the same state. As an example (Possible teams column titles mapped to the required underlying states):

![A black background with a black square Description automatically generated with medium confidence](Common%20workflow%20states%20to%20improve%20reporting_media/media/image2.png)

The underlying states below in **BOLD** are the states an active [Product Backlog Item (PBI)](https://schroders365eur.sharepoint.com/sites/myschroders/content/Pages/CorporatePages/cA5DcI8h54ye17yXUNla6w/388a414f-4b39-4a75-85ba-621264a4b949.aspx) (opens new browser tab) must move through to make us compliant with the SDLC policy and internal audit. The exception to this is PBIs that are never worked upon, as these can be removed from the workflow at any step of the process using the **REMOVED** state.

Our current underlying states are detailed in the table below and may evolve and change in the future to better suit our needs.

| **State** | **Accountable** | **Audited\*** | **Definition** |

|-------------|-------------------------------|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

| **New** | Any | **Default** | For any new work item, this is the default creation state. |

| Approved | Capability Owner (CO) | No | CO uses this state to differentiate stories that have been prioritised for further refinement. Approved user and date fields are auto-populated by users performing the action. We may eventually choose to stop using this workflow step as we structure our backlogs better.|

| **Ready** | Capability Owner (CO) | **Yes** | CO ensures the story reflects expected outcomes and the team ensures it meets their [**Definition of Ready**](https://schroders365eur.sharepoint.com/sites/myschroders/content/Pages/CorporatePages/cA5DcI8h54ye17yXUNla6w/7b41446b-109e-4460-99ac-37ce8c62dd91.aspx) for planning. (**Audit step**) |

| **Committed** | Team | **Yes** | Story meets [**Definition of Done**](https://schroders365eur.sharepoint.com/sites/myschroders/content/Pages/CorporatePages/cA5DcI8h54ye17yXUNla6w/87fd8010-884c-426f-a99c-58b8fbe17df8.aspx), is appropriately prioritized, and chosen to be played by the Capability Owner.|

| In Progress | Team | No | At least one of the Team members has started on the story. (**Metric step**) — whilst not an audited field, it is important for metrics to clearly define when work starts, e.g., Cycle Time. |

| Review | Team | No | Team agrees the work for this story has met their [**Definition of Done**](https://schroders365eur.sharepoint.com/sites/myschroders/content/Pages/CorporatePages/cA5DcI8h54ye17yXUNla6w/87fd8010-884c-426f-a99c-58b8fbe17df8.aspx) for the CO to review. |

| **Done** | Capability Owner (CO) | Yes - Default final state in ADO | CO or product proxy agrees the work has met their expectations, Acceptance Criteria, and the team\'s [**Definition of Done**](https://schroders365eur.sharepoint.com/sites/myschroders/content/Pages/CorporatePages/cA5DcI8h54ye17yXUNla6w/87fd8010-884c-426f-a99c-58b8fbe17df8.aspx). **Audit Step** - If CO delegates this action, a note should be added. |

| Removed | Capability Owner (CO)/Team | No | CO or a product proxy agrees that the story is not required or no longer relevant. This state allows backlog cleanup without affecting team metrics and skewing cycle time. Teams must ensure no associated code change remains when a work-item is removed. |

| Released | | **DO NOT USE THIS STATE** | This means work is never 'done' and all metrics are invalid, effectively mimicking 'Removed'. We will be working with teams using this state to transition away from it. |

**\*A note on audit steps:** The audited steps above are to ensure work has been through suitable business prioritization, refinement, and signoff, confirming that the work has been carried out as per specification and that there is an associated approver. It ensures the business is accountable throughout the process for the suitability of what's being produced by the teams.

## How do we ensure we're consistent?

Any new teams at Schroders using ADO are set up with a default process template called "[Scrum -- Schroders Master template](https://dev.azure.com/schroders/_settings/process?process-name=Scrum%20-%20Schroders%20Master%20Template&_a=workitemtypes#process-name=Scrum%20-%20Schroders%20Master%20Template&_a=workitemtypes)" (opens new browser tab).

This template contains Schroders customizations such as:

- New work-item types.

- The addition of new states.

- The addition of new fields.

The template is derived from the built-in process template "Scrum".

Bugs, Tasks, Epics, and Features are not currently defined as having audited states. However, each has its own states defined in the process template.

## A note on work-types

- **Product Backlog Item (PBI):** The smallest increment of value, typically written as user stories.

- **Production Defect:** An issue found in live; a previous requirement not successfully met, not a new requirement.

- **Bug:** An issue found before the requirement was released to live. In ADO, a team can configure a Bug to operate in their workflow like either a Task or a PBI.

- **Task:** Teams may choose to break down their PBIs into Tasks to coordinate sub-tasks involved in its completion.

- **Feature:** Groups multiple related PBIs into a larger piece of value within a team.

- **Epic:** Groups multiple features into a larger deliverable value, can be shared across multiple teams, and runs as necessary.

Epics and Features are under review and may follow the same rules as PBIs to facilitate metrics and reporting at all levels.

Teams are advised against local customizations to avoid using any state which is auditable or used in common reporting, as outlined in the table above.

## References

- [Full details on our workflow states: Product Backlog Item - States](https://confluence.schroders.com/display/DN/Product+Backlog+Item+-+States).

- For a full description of each field and work item type and use:

- [HowTo - Manage PBIs in VSTS](https://confluence.schroders.com/display/DN/HowTo+-+Manage+PBIs+in+VSTS)

- [HowTo - Manage Features in VSTS](https://confluence.schroders.com/display/DN/HowTo+-+Manage+Features+in+VSTS)

- [HowTo - Manage Epic Work Items in VSTS](https://confluence.schroders.com/display/DN/HowTo+-+Manage+Epic+Work+Items+in+VSTS)
