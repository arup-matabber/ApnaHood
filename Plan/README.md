__here `?` means optional__
# Database Schema Overview for User and Property
### User
- _id &nbsp;`default`
- password
- username &nbsp;`unique`
- properties &nbsp;*(list of property ids')*&nbsp; `?`
- email `unique`
---
### Property 
- _id &nbsp;`default`&nbsp;&nbsp;&nbsp;It is backreferenced back into ___owner.properties___
- Name &nbsp;`unique`
- Owner
- Rating &nbsp;`Integer from 1 to 5`
- Cost
- Address
- Thumbnail
  