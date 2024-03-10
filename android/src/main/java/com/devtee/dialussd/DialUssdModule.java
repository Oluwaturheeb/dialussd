// DialUssdModule.java

package com.devtee.dialussd;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.module.annotations.ReactModule;
// added
import android.os.Handler;
import android.os.Looper;
import android.telephony.TelephonyManager;
import android.content.Context;

@ReactModule(name = DialUssdModule.NAME)
public class DialUssdModule extends ReactContextBaseJavaModule {
  public static final String NAME = "DialUssd";
  private ReactApplicationContext reactContext;

  public DialUssdModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = getReactApplicationContext();
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void dialUssd(String ussdCode, final Promise promise) {
    TelephonyManager telephonyManager = (TelephonyManager) this.reactContext
        .getSystemService(Context.TELEPHONY_SERVICE);
    if (telephonyManager != null) {
      telephonyManager.sendUssdRequest(ussdCode, new TelephonyManager.UssdResponseCallback() {
        @Override
        public void onReceiveUssdResponse(TelephonyManager telephonyManager, String request, CharSequence response) {
          try {
            super.onReceiveUssdResponse(telephonyManager, request, response.toString());
            promise.resolve(response.toString());
          } catch (Exception e) {
            promise.reject("Can not perfom the action!");
          }
        }

        @Override
        public void onReceiveUssdResponseFailed(TelephonyManager telephonyManager, String request, int failureCode) {
          super.onReceiveUssdResponseFailed(telephonyManager, request, failureCode);
          promise.reject("Failed to send USSD code. Failure code: " + failureCode);
        }
      }, new Handler());
    }
  }
}
