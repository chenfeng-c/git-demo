warning: in the working copy of 'src/assets/css/home.css', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/src/assets/css/home.css b/src/assets/css/home.css[m
[1mindex 4d6ffb6..543b365 100644[m
[1m--- a/src/assets/css/home.css[m
[1m+++ b/src/assets/css/home.css[m
[36m@@ -183,7 +183,8 @@[m
   color: #ffffff;[m
   transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);[m
   cursor: pointer;[m
[31m-  white-space: nowrap;[m
[32m+[m[32m  white-space: normal;[m
[32m+[m[32m  line-height: 1.5;[m
   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;[m
   position: relative;[m
   overflow: hidden;[m
[36m@@ -1256,7 +1257,7 @@[m
   }[m
   [m
   .hero-badges {[m
[31m-    grid-template-columns: repeat(2, 1fr);[m
[32m+[m[32m    grid-template-columns: 1fr;[m
     gap: 10px;[m
     margin-bottom: 30px;[m
   }[m
[36m@@ -1266,6 +1267,8 @@[m
     font-size: 0.85em;[m
     gap: 8px;[m
     border-radius: 12px;[m
[32m+[m[32m    align-items: flex-start;[m
[32m+[m[32m    text-align: left;[m
   }[m
   [m
   .badge-icon {[m
[36m@@ -1329,6 +1332,41 @@[m
     margin-bottom: 20px;[m
   }[m
 [m
[32m+[m[32m  .gallery-section {[m
[32m+[m[32m    padding: 60px 0;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .gallery-content {[m
[32m+[m[32m    padding: 0 20px;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .gallery-content h2 {[m
[32m+[m[32m    font-size: 1.8em;[m
[32m+[m[32m    margin-bottom: 15px;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .gallery-description {[m
[32m+[m[32m    font-size: 1em;[m
[32m+[m[32m    margin-bottom: 30px;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .image-wrapper {[m
[32m+[m[32m    height: 220px;[m
[32m+[m[32m    border-radius: 12px;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .image-overlay {[m
[32m+[m[32m    padding: 20px;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .image-title {[m
[32m+[m[32m    font-size: 1.2em;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .image-desc {[m
[32m+[m[32m    font-size: 0.9em;[m
[32m+[m[32m  }[m
[32m+[m
   .features {[m
     grid-template-columns: 1fr;[m
     gap: 20px;[m
