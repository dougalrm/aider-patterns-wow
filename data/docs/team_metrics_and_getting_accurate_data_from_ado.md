---
tags: ["metrics-and-reporting", "delivery-and-flow", "definitions-of-done-ready"]
title: Team metrics and getting accurate data from ADO
#id:
#sidebar_label:
#keywords:
#  - keyword1
#  - keyword2
#  - keyword3
description: Discover how the new Team Metrics tool from the Enterprise Insights Unit enhances agile teams by providing precise cycle time and defect ratio data, crucial for balancing speed and quality. Learn best practices to maintain data accuracy from ADO, and understand differences with Actionable Agile for improved product development.
#tags:
#  - tag1
#  - tag2
#  - tag3
---


![An island in the water](Team%20metrics%20and%20getting%20accurate%20data%20from%20ADO_media/media/image1.jpeg)

# Team Metrics & Getting Accurate Data from ADO



We are focused on metrics that enable teams to gain valuable insights that help them improve. In 2024, we are concentrating on **cycle time** and **defect ratio**, which help teams strike the right balance between speed and quality.

## The New Team Metrics Tool

The Enterprise Insights Unit (EIU) team has introduced a new tool that reliably provides both cycle time and defect ratio data for all teams in GT. The team has also decommissioned the old Power BI Delivery Performance Dashboard.

The tool can be found at the URL [team-metrics.schroders.com](http://team-metrics.schroders.com/), however, this is an MVP (Minimal Viable Product) that will be improved over time based on feedback.

As of June 2024, the tool reports Cycle Time and Defect Ratio for a single team for a specified date range. You can read about how these are calculated [here](https://confluence.schroders.com/pages/viewpage.action?pageId=147890214), and about the change in the cycle time calculation and the benefits this brings [here](https://confluence.schroders.com/display/DN/Metrics:+Aligning+the+new+Enterprise+Insights+tool+to+Actionable+Agile).

The new tool also allows team data to be added (and edited), and this is required before any reports can be generated.

![A screenshot of a computer](Team%20metrics%20and%20getting%20accurate%20data%20from%20ADO_media/media/image2.png)

## Getting Accurate Data from ADO

Both the new Team Metrics tool and Actionable Agile get their data from ADO. For this data to be accurate, it's important to follow a few consistent and simple ways of working. These include:

- Ensuring your [team details are in the new tool](https://team-metrics.schroders.com/teams) and are up to date. This is now the master record of the teams we have in GT. Simply click on Team in the navigation bar, and you will have the ability to add a new team or edit key details of an existing team, including the team name, technology domain, and the ADO backlog(s) that should be used for metrics. The [team name field should be the team's identity](https://confluence.schroders.com/pages/viewpage.action?pageId=147888805), e.g., "The Fighting Eagles".

- Remembering to set the field "No Production Code Change" to True for PBIs (Product Backlog Items) that do not result in a production code change. This field has a default status of False, which indicates that it IS a production code change.

- Using the Work Item Type Production Defect for issues discovered once something is in production, and the Work Item Type Bug for issues discovered before they reach production (lower environments).

- Using the correct severity definition when raising defects. These can be found on [this Confluence page](https://confluence.schroders.com/pages/viewpage.action?spaceKey=SM&title=Incident+Management).

- Ensuring you're using Product Backlog Items to track your work in ADO (and not Tasks).

### We Also Expect Teams to:

- Adopt a Definition of Done (DoD) that means a PBI is done when it's in production. Therefore, PBIs do not move to the done state in ADO until they are deployed to production.

- Continue to make use of Actionable Agile (AA) to gain insights into possible improvements. Guidance on AA can be found on the [using Actionable Agile on ADO](https://schroders365eur.sharepoint.com/sites/myschroders/content/Pages/CorporatePages/uvdmNFbhGhzyMpGgOHA/0760f6f1-b30a-49ee-8b21-b6a913ea3014.aspx) CDF page.

## Differences Between the Two Tools

In some instances, there will be differences between the cycle time calculated by the Enterprise Insights metrics tool and the same calculation done by Actionable Agile (AA).

This is due to the fact that AA includes production defects that move straight to done, never entering an "In Progress" state. However, our application will not pick up any work items that skip the "In Progress" state, so it's especially important to follow the practices outlined above.

## More Information & Getting Help

The CDF page [Why We Care About Metrics](https://schroders365eur.sharepoint.com/sites/myschroders/content/Pages/CorporatePages/AxES3qYq3pYZaIjkYGCfsA/27ec752f-b29e-4d63-b345-b217b913e7ba.aspx) provides a good overview of the benefits of focusing on adopting and refining the right capabilities.

You can find more information on Actionable Agile on Confluence [here](https://confluence.schroders.com/pages/viewpage.action?pageId=179523543).

You can also attend the regular 30-min Metrics Clinics, which are a great place to ask questions and learn from those with more experience. These sessions occur every other Tuesday at 3 pm. However, those in APAC should get in touch if they would like a session arranged to suit their time zone. These can be found in the [Showcase Calendar.](https://schroders365eur.sharepoint.com/sites/myschroders/content/Pages/CorporatePages/ZnItogF7IpiI2HA9asSMiA/7a36a2d9-a072-4240-892f-ea810b209be8.aspx)

You can also contact an Enterprise Engineering Lead or Enterprise Delivery Lead.
