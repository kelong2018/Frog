#import <UIKit/UIKit.h>
#import <GLKit/GLKit.h>
#import <conchRuntime.h>
#import "Firebase.h"
#import "NativeInterface.h"

@interface ViewController : GLKViewController<GADRewardBasedVideoAdDelegate>
{
@public
    
    GLKView*                    m_pGLKView;
    
    EAGLContext*                m_pGLContext;
    
    conchRuntime*               m_pConchRuntime;
}
+(ViewController*)GetIOSViewController;
-(id)init;
-(void)showVideo;
-(void)showBanner:(bool)visible;
@property (nonatomic, strong) GADBannerView *bannerView;

@end

