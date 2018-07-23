package com.layabox.test;

import android.hardware.Camera;
import android.widget.Toast;

import demo.MainActivity;
import layaair.game.browser.ExportJavaFunction;

//import CONNECTIVITY_SERVICE

public class Test {
    public static Camera camera = Camera.open();
    public static Camera.Parameters parameter;
    public static void openlight(boolean bOpen) {
        if(bOpen) {
            camera.startPreview();
            parameter = camera.getParameters();
            parameter.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH);
            camera.setParameters(parameter);
        }
        else {
            parameter = camera.getParameters();
            parameter.setFlashMode(Camera.Parameters.FLASH_MODE_OFF);
            camera.setParameters(parameter);
            camera.stopPreview();
        }
        // 静态函数回调通知js端
        ExportJavaFunction.CallBackToJS (Test.class, "openlight", "from androidx");
        Toast.makeText(MainActivity.share(), "call back", Toast.LENGTH_LONG).show();
    }
}
