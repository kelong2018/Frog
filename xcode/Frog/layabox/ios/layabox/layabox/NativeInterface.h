//
//  NativeInterface.m
//  layabox
//
//  Created by wangxu on 2018/7/1.
//  Copyright © 2018年 layabox. All rights reserved.
//

#import <Foundation/Foundation.h>

//@protocol ThirdPartyAdDelegate<NSObject>
//@required
//- (void)showVideo;
//
//@required
//- (void)showBanner:(bool)visible;
//@end

@interface ThirdSdk : NSObject

+(void) bannerAdd:(NSNumber*)show; // 只支持对象类型bool类型用NSNumber
+(void) videoAdd; // 只支持对象类型bool类型用NSNumber

@end
