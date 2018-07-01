//
//  NativeInterface.m
//  layabox
//
//  Created by wangxu on 2018/7/1.
//  Copyright © 2018年 layabox. All rights reserved.
//

#import "NativeInterface.h"
#import <conchRuntime.h>
#import "Firebase.h"
#import "ViewController.h"

@implementation ThirdSdk

+(void) bannerAdd:(NSNumber*)show
{
    if(show.intValue) {
        [[ViewController GetIOSViewController] showBanner:true];
    } else {
        [[ViewController GetIOSViewController] showBanner:false];
    }
    
    NSString* s = NSStringFromClass(self.class);
    
    [[conchRuntime GetIOSConchRuntime] callbackToJSWithClass:self.class methodName:@"bannerAdd:" ret:@"{\"ret\":true}"];
}

+(void) videoAdd
{
    [[ViewController GetIOSViewController] showVideo];
    
    
//    [[conchRuntime GetIOSConchRuntime] callbackToJSWithClass:self.class methodName:@"videoAdd" ret:@"{\"ret\":true111}"];
}

@end
