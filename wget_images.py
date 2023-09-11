import os
import subprocess

# Your JSON data here (truncated for brevity)
image_data = {
  "Cabane bobo & spa": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079370/1079370/91651223-1fdf-4e5e-828c-e488688bd08b.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070361/1070361/3179ae5b-18a2-4af1-bb4f-e00cbd75ce21.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070365/1070365/76095b2c-9fa5-4f39-880b-73a7235d3200.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079371/1079371/2975d690-8b05-48b9-bbc2-ee3219cc931a.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079368/1079368/cceb0a56-7131-4744-8894-6aeabdd671a5.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079367/1079367/da6829a6-90ba-4129-92f2-22a68f5e8fb1.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079369/1079369/75915ff1-811f-4ce5-a6d8-30837b4e4cbe.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070359/1070359/b5862b7e-ec04-4cac-b6ee-c225776dadb1.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079375/1079375/f03bd420-4f95-4f8c-a0aa-ca462a8498ac.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079372/1079372/c7c4b01d-f266-459b-80b2-3318dcc97207.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079374/1079374/1b71bf6e-e7c2-4016-ba29-59af20482334.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079376/1079376/fd987f75-0a34-4b23-ba22-8837602e905b.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079373/1079373/398091ea-1529-408b-a17f-0501672272fe.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070358/1070358/45a91e09-b737-40d9-933a-eb200bc69013.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070357/1070357/8da69120-42f8-4830-a7ff-12fe2c17cab0.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070356/1070356/1261e289-0d32-4ae1-82b2-875a46dac563.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070364/1070364/aa5de195-1abe-4e9a-8655-049ffe5835c0.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070360/1070360/5f8c1de9-0e80-452b-82a1-e7f09706352e.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070355/1070355/e6f94188-d4b8-47ce-9848-532da1831acb.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070363/1070363/b7dfea58-609a-48f5-99b4-d8e280b7cc08.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070362/1070362/24e3b79b-e851-4c73-b8c7-11645e104c66.jpg"
  ],
  "Tente Expérience Africa": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070063/1070063/728f38b5-7289-4a53-810f-42b5bad3117b.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070062/1070062/e3927017-f917-4e1b-b7f2-3977670ba43b.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070064/1070064/3abc0281-b816-45cf-8ecf-ef00fd0a2743.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070066/1070066/d5aeedea-1281-4859-a721-4c5c866427e2.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070065/1070065/1c10e254-57a1-460d-be80-11a68b9cc7af.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070070/1070070/0603d45f-e26f-42cf-88aa-3271d69af6a9.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070069/1070069/dbb1885e-29b4-44ab-8927-91ba1aa28ef0.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070067/1070067/e9699245-87c5-48c4-b065-78013b0a10fc.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070068/1070068/63f301ea-2854-424b-b565-d58d54644c0d.jpg"
  ],
  "Jungle Dôme & spa": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070042/1070042/dbd175a5-170b-4d66-a771-7db519cfe58c.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070037/1070037/cfdf6e80-e769-4241-b7d9-3d5a6fbd9691.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070034/1070034/cf38bc12-ed96-4dc2-879b-131e617086a3.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070033/1070033/6c437146-6d9c-4387-8b0e-2def9362be9b.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070036/1070036/ba956a70-46f4-4b46-b2da-88551e8a93e2.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070041/1070041/59b8a4b4-1729-4ec4-81f0-20275d99b6e5.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070038/1070038/4db7fdf9-37cb-42ac-903a-e737b0d3e872.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070039/1070039/39eab9d4-a493-481f-9a1d-363a69f197d0.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070035/1070035/bdbd798d-e1b4-4e37-a9e8-3be293fedef1.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070040/1070040/0ac6fa5d-1abd-4f57-9bb6-b89dd467cbb4.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070045/1070045/53e3373f-0b06-4d76-919f-44c9d1b414ff.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070046/1070046/a1041e96-03c1-4534-ae9e-ac39bb654589.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070047/1070047/10d0dca5-1d15-4373-90b7-d2bf028f73be.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070044/1070044/1c494aeb-7a30-429a-9b7c-0c75c38963a1.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070043/1070043/b7ca8c99-8a87-47c6-9cc8-ed2f42cbbaa2.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070048/1070048/b115687a-fa73-4604-8f90-c5f849116116.jpg"
  ],
  "Cabane Chic Lacustre & spa": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079392/1079392/80fb0197-0523-4870-a125-148003636104.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079391/1079391/879c97dd-ff9b-437e-8d12-aa83bb91bb75.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079390/1079390/956a8220-b53b-448d-9912-4001fce68e91.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079388/1079388/449cbede-4981-4a5e-a10f-2f2e52797aed.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079389/1079389/e035a590-cfc7-4c9c-9c6e-a40d24a5fb34.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079395/1079395/13a3d072-f594-41aa-87fc-343345bb6f7b.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079397/1079397/d679889a-8910-4e02-9b24-c4b585612a17.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079396/1079396/9ccaec6a-21ac-4d5f-9359-4262eb201ca9.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079394/1079394/0ca4da90-6435-4da0-940c-85c066d75164.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079393/1079393/ece8ca25-ff91-417e-80b4-da01e6fc765e.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079401/1079401/91cdcda3-c350-4543-bbac-33f3580f3bc3.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079398/1079398/d747e51a-e032-4a8b-a7e8-e3ea323f9767.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079399/1079399/1c9c1568-6d45-444f-b7c3-c223c0fc9791.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079402/1079402/b0c3babc-5a98-4e27-b8a9-574cdaf2a595.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079400/1079400/813a1542-ddf0-489d-912d-ab35a9705772.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079405/1079405/7999f8a8-c537-4e0d-a1cf-d7e580f6b824.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079406/1079406/1e393e6b-1e8d-4969-a226-c191df04ec65.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079403/1079403/e3bd3a4a-c1fb-4e41-8d30-c0d923989719.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079407/1079407/5c311a24-9269-43c7-89fd-ee160854fca9.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1079404/1079404/2d84cb7c-3400-45e5-93c1-9c26742ed255.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069979/1069979/046e8c09-b119-4213-be89-92a1991183ad.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069976/1069976/002c056a-cf45-4de7-b8cb-6d12a6c54921.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069972/1069972/2825c166-800e-48a6-ad13-46ff3e834daf.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069975/1069975/d307b94a-5103-47a2-807e-42b1c597d70c.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069978/1069978/cc57d025-2155-48a9-b5f9-d794df74fd51.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069980/1069980/681f9566-1803-4f6a-a672-98f74098b71a.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1066630/1066630/346bcca4-bed3-44ca-95f7-5e36047b9f68.jpg"
  ],
  "Glamping Dreamlodge": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070025/1070025/ecc17738-804e-42cd-9441-3d4b6bffc2ea.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070022/1070022/81ad6c52-5c9e-4f83-bbc2-c05f21cce086.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070018/1070018/308386f8-568d-4c25-b9ac-15820b55f872.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070019/1070019/0d5328f1-2da1-418e-a0d4-2820006470c8.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070020/1070020/eafaea1a-442e-4395-b2c4-82173ec0756d.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070024/1070024/b4608811-7e60-4b13-a2d1-20139f6d29c3.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070028/1070028/b51f2745-3ac4-4870-91ff-a7dca9e4b812.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070030/1070030/0f7738a1-382e-496b-a447-2a9d1b07bc41.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070021/1070021/d34a6972-9bd0-4fe5-96ec-6668167dbe1e.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070023/1070023/1fcbcf49-b1a1-497d-b5c3-7e450c0c9a09.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070027/1070027/cbf1e93f-bd8f-4a16-8910-056a3499f7b6.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070017/1070017/76fd6375-7409-48fe-bf69-7cd3fe16ddf8.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070016/1070016/54684707-c22b-46db-bd25-a9b4e8d758f6.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070026/1070026/155ed765-2350-46a0-b868-7095e12e0235.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070029/1070029/727e2cf2-e5dc-43cf-9ece-d949e64c24e4.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070031/1070031/45410013-834a-4e6c-817a-c97e480c8d59.jpg"
  ],
  "Premium Family Cottage": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070348/1070348/77645e65-ddd5-4926-8877-0b6a239da49b.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070349/1070349/78ca4bfe-6410-49a7-8050-d7662bb7cfc3.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070352/1070352/dc05a48e-bd31-4bb1-959a-4494ea8df6da.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070351/1070351/4737a54b-5ddc-4619-9a3e-b61318ebe6c2.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070350/1070350/b1c67a5d-5d49-4788-b9c9-661a66d86ed0.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070353/1070353/ae357d82-9b11-4983-958e-48ac5e069152.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070354/1070354/601f899c-6b9f-4847-821f-21c709dddd5e.jpg"
  ],
  "Tente Lodge Safari": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070330/1070330/094e95ee-c6a7-4320-8ae2-ef8d1f214512.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070331/1070331/701e51a5-978b-4da3-a29e-165f66b9efac.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070332/1070332/473de077-1957-4458-bc0d-d8c75e7cc01c.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070333/1070333/d36b6a70-b66b-4001-bbe9-4fcb2b36508f.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070334/1070334/28905bf6-2e98-418b-a674-5e334108c61b.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070338/1070338/e6d8dd93-0917-46e7-a049-6f8e257c269e.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070336/1070336/a8c16429-736d-4e1d-a9e6-d6f3e43fd328.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070337/1070337/67be40f5-5d9b-42cf-a7dd-7e22dfee0957.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070335/1070335/3dc6a5a5-0c68-4047-8c83-783b2ae8d799.jpg"
  ],
  "Cottage Colvert": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070399/1070399/36a05f15-3594-42a2-bfa2-9bbd4f413b6d.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070396/1070396/1b8676b8-1f7e-4ba0-a3e4-3f3a637770e8.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070395/1070395/99a132e1-6d19-4ecf-bf30-13a78a0ec4b9.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070398/1070398/5763a9e5-e7a7-4fc7-853f-307161cb50b9.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070397/1070397/18cf9511-b775-4980-b0e2-ddc14c26feeb.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070401/1070401/b6da0a98-362f-47d4-b8d1-d04951db5018.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070402/1070402/39af145a-87d6-4017-9ebe-9e77371331c4.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070400/1070400/c79220f0-ffa5-4d57-8064-0d1e343387ed.jpg"
  ],
  "Coco Sweet": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069999/1069999/332a9834-ec6e-4157-b8fa-964a09462de3.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069997/1069997/6299f343-5cd3-45cc-8492-e9d35366d2f2.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069989/1069989/fc9de555-db1a-493e-8b26-7a8f79c97f03.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069992/1069992/c31912f6-c7a1-4dc3-b11f-87f78f0fef51.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069996/1069996/be65a0dd-7211-442a-b6b0-8299a542bba5.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069988/1069988/30068376-687c-48cf-af6a-d93d4d8a9d47.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069990/1069990/3074bbfb-1115-44bb-905b-4bafa2c1d326.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069995/1069995/44f9c2b7-06b6-4283-9bfb-f753fa429cfd.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069994/1069994/fe50696d-8b1e-4cb9-ab40-280e54fe2e6e.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069991/1069991/34338d37-f139-486a-9d0c-df765f36e665.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069993/1069993/d6ef56f6-b213-4b56-9293-fe77cddcd410.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069998/1069998/9f3f1b02-a0e7-4005-998c-3eecf7070d99.jpg"
  ],
  "Cabanon du Lac": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069984/1069984/95a8be9a-eb03-4dd7-af5d-50a1e57f289a.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069982/1069982/7df05916-e5ef-41ef-a8bc-242ecf99acec.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069981/1069981/ce4a8872-7fa1-4ad0-9e79-53559929f941.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069986/1069986/94bf2790-2621-4cf4-9ac2-8e0796009fa5.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069987/1069987/2a8ccae7-1efd-41da-ab5d-a0664db1a44c.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1069983/1069983/12f11b4d-b4bd-4d20-9053-04c66ed27288.jpg"
  ],
  "Ecolodge Mojito": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070006/1070006/88278589-dcd2-481b-935c-ac952e193168.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070004/1070004/d44cd489-48f9-4803-b8d9-097c646540a0.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070000/1070000/b3d224d2-5fa6-4fc2-abdc-1a140a6dde51.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070002/1070002/f0570c9e-4f28-47f4-a2b4-a37239ad47ee.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070001/1070001/ff5fbfca-7a98-4363-a8d9-7f14a199d634.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070007/1070007/b0d909a6-f989-474f-9282-797a48783868.jpeg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070005/1070005/54684707-c22b-46db-bd25-a9b4e8d758f6.jpg"
  ],
  "Ecolodge duplex nature": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070014/1070014/3b406991-64a7-4d2c-b45b-af9abe67fcbf.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070013/1070013/44b3e7ba-9bfc-4f14-a76a-3538ce25659a.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070012/1070012/2f306fa2-62e2-4879-b414-5b2d0434c2e0.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070011/1070011/25466550-cb65-4d0f-b78e-b743d683b1a2.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070015/1070015/38f3b9d2-3ff3-4aff-a62b-2b495f8142e3.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070010/1070010/1723e6ef-820f-4c32-b05b-a56c36003fe8.jpg"
  ],
  "Tipi Heureux": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070107/1070107/591fab0e-732a-4eca-ab67-4c8759398cc3.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070103/1070103/528e3402-15ec-4895-beb8-08380ccec3b5.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070106/1070106/70224821-a316-4267-9a4f-ab9b7a1c332c.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070105/1070105/613f8671-3e37-47e1-b6e5-291474cd58bd.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070104/1070104/6215dbaf-d79a-4e13-b907-f0f5db2973a1.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070109/1070109/4d0d91de-c499-41e8-98d0-680e48658660.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070110/1070110/741c3a74-1d0a-4cd7-8671-0335c76ee8f4.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070111/1070111/17a8544d-6bc8-461a-8cf9-e8294a44bbf1.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070108/1070108/b2e34c5e-193b-4e73-a4f1-3c1d6544a27e.jpg"
  ],
  "P'tite cabane sur l'eau": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070053/1070053/3d4e8c4f-cd42-48f5-ad8b-813e5ea48eaa.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070052/1070052/64e514cc-71cf-4925-b124-cc6b807b75dd.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070054/1070054/0cb42a18-3e81-413f-a1d1-9b06fcadb106.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070051/1070051/380a86ba-bfec-4300-9f65-826db7ff209f.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070050/1070050/66afc32a-6cd3-476f-9a46-6c992934446b.jpg"
  ],
  "Petit chalet": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070056/1070056/2b32c55f-9ff8-45ce-880f-1e1a78740496.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070057/1070057/e704334b-5f4a-4c3a-a92e-79b468359ede.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070058/1070058/03796616-243a-496b-97d0-3f5c5e648946.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070055/1070055/e0988321-6647-4aba-bb47-4bc272afae7b.jpg"
  ],
  "Tente nomade 2 pers": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070090/1070090/d1da3c64-e397-49d7-9602-b2184b907178.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070093/1070093/d5bb4ab4-96fe-41f0-8a40-294155616393.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070092/1070092/074692bb-c8ff-46f0-8263-ea1b526f0acf.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070091/1070091/e907db4f-cf14-4470-b77b-8c4217501aaf.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070089/1070089/439b4897-2878-4bcb-81d3-1a6ed1feb566.jpg"
  ],
  "Tente nomade 3-4 pers": [
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070100/1070100/efa9d0fb-e8bc-4d91-9608-72a412171174.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070101/1070101/d9a58804-7fa0-4896-88bd-332e8cfe4a5a.jpg",
    "https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/1070102/1070102/fc0b2fbe-38de-4afc-a38f-8878af8595e9.jpeg"
  ]
}

for folder_name, image_urls in image_data.items():
    # Create folder if it doesn't exist
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
        
    # Download images using wget
    for idx, url in enumerate(image_urls):
        output_file_path = f"{folder_name}/{idx}.jpg"
        subprocess.run(["wget", "-O", output_file_path, url])